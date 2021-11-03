const port = 8000;
const url = "https://www.theguardian.com/international";
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

axios(url).then(response =>{

    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.fc-item__title',html).each(function(){
        const title = $(this).text();
        const ArticleUrl = $(this).find('a').attr('href');
        articles.push({
            title: title,
            url: ArticleUrl
        });
    })
}).catch(err => console.log(err));

app.listen(port,() => console.log('server running on port: ' + port));

