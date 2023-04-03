const PORT = 8000
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const fs = require("fs");

const app = express()

const url = 'https://mangakakalot.com/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        var manhwas = ""

        $('.tooltip',html).each(function () {
            const title  = $(this).text()
            const link  = $(this).attr('href')
            manhwas += title + " " + link + "\n"
        })
        
        fs.writeFile("texte.txt", manhwas, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Texte saved to texte.txt");
          });

    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

