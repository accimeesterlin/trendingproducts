/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const chromium = require("chrome-aws-lambda");
const numeral = require("numeral");
const cheerio = require("cheerio");

exports.handler = async (event) => {
  try {
    const { aliUrl } = event?.queryStringParameters;

    if (!aliUrl) {
      return {
        statusCode: 500,
        //  Uncomment below to enable CORS requests
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          message: "'AliUrl' param is requried",
        }),
      };
    }
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(aliUrl);
    const content = await page.content({
      headless: false,
    });
    const $ = cheerio.load(content);

    // Get product id from url
    const productId = aliUrl?.match(/\d+/)[0];

    const productTitle = $(".product-title-text").text();
    let sold = $(".product-reviewer-sold").html();

    if (sold) {
      sold = sold.replace(/ .*/, "");
    }
    const productPrice = $(".uniform-banner-box-price").text();
    let totalReviews = $(".product-reviewer-reviews").html();
    if (totalReviews) {
      totalReviews = totalReviews.replace(/ .*/, "");
    }
    const images = [];
    const imageCover = $(".magnifier-image").attr("src");
    $(".images-view-item > img").each((index, element) => {
      images.push($(element).attr("src"));
    });

    // Store Information
    const storeName = $(".store-name").text();
    const positiveFeedBack = $("[data-role='positive-feedback'] > i").html();
    let followers = $(".num-followers > i").html();
    if (followers) {
      followers += followers.replace(/ .*/, "");
    }
    // const description = page.evaluate(() => $(".product-description").html());

    const product = {
      productId,
      title: productTitle,
      // description,
      productPrice,
      productUrl: aliUrl,
      sold,
      totalReviews,
      positiveFeedBack,
      storeName,
      followers: numeral(followers).format("0 a"),
      images,
      imageCover,
    };

    browser.close();
    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        ...product,
      }),
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      statusCode: 500,
      //  Uncomment below to enable CORS requests
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Error getting product details",
      }),
    };
  }
};
