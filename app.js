const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 6000;

const validateMsisdn = async (msisdn) => {
  return new Promise((resolve, reject) => {
    const regex =
      /^(\+){0,1}(254|0){0,1}(110|111|112|113|114|115|116|117|118|119|701|702|703|704|705|706|707|708|709|710|711|712|713|714|715|716|717|718|719|720|721|722|723|724|725|726|727|728|729|740|741|742|743|745|746|748|757|758|759|768|769|790|791|792|793|794|795|796|797|798|799)(\d{6})$/;
    if (regex.test(msisdn)) {
      resolve(true);
    } else {
      reject(false);
    }
  });
};

app.post("/api/phoneNumber", async (req, res) => {
  console.log(req.body);
  const msisdn = req.body.msisdn;
  const message = req.body.message;
  const shortcode = req.body.shortcode;
  const product = req.body.product;
  const offer_code = req.body.offer_code;
  const requestId = req.body.requestId;
  const customer_id = req.body.customer_id;
  console.log(req.body.Result.ReferenceData);

  try {
    await validateMsisdn(msisdn);
    setTimeout(() => {
      res.status(200).json({
        status: `Received payload ${msisdn},${message},${shortcode},${product},${offer_code},${requestId},${customer_id} `,
      });
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      res.status(400).json({ error: "Invalid Safaricom Msisdn" });
    }, 2000);
    return;
  }
});

app.listen(port, () => {
  console.log(`--- Server is listening on port ${port} ---`);
});
