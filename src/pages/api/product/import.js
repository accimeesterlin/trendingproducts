import numeral from "numeral";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import chromeAwsLambda from "chrome-aws-lambda";

export default async function handler(req, res) {
  let browser = null;
  try {
    const { aliUrl } = req.query;

    if (!aliUrl) {
      return res.status(403).json({
        statusCode: 403,
        message: "'AliUrl' argument is missing",
      });
    }
    browser = await puppeteer.launch({
      args: chromeAwsLambda.args,
      // defaultViewport: chromeAwsLambda.defaultViewport,
      executablePath: await chromeAwsLambda.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(aliUrl);
    const content = await page.content();
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
    res.json({
      ...product,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Error getting product details",
      statusCode: 500,
      error,
    });
  }
}
