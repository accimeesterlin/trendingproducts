import axios from "axios";

const aliImportUrl =
  "https://w8shi2rp09.execute-api.us-east-1.amazonaws.com/aliImport-dev";

export default async function handler(req, res) {
  try {
    const { aliUrl } = req.query;
    const url = `${aliImportUrl}?aliUrl=${aliUrl}`;

    if (!aliUrl) {
      return res.status(403).json({
        statusCode: 403,
        message: "'AliUrl' argument is missing",
      });
    }

    const { data } = await axios(url);
    res.json({
      ...data,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Error getting product details",
      statusCode: 500,
    });
  }
}
