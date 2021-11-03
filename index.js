const port = 8000;
const url = "https://www.theguardian.com/international";
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


//http request methods
//app.METHOD(PATH, handler)

app.get('/',function(req, res){
    res.json('This is my awesome webScraper!');
})

app.get('/results',(req,res) =>{

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

        res.json(articles);

    }).catch(err => console.log(err));

})



app.listen(port,() => console.log('server running on port: ' + port));

