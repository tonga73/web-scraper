const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/international";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".u-faux-block-link__overlay", html).each(function () {
      const title = $(this).text();
      const articleUrl = $(this).attr("href");

      articles.push({
        title,
        url,
      });
    });

    console.log(articles);
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
