const PORT = 8000
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express()

const url = 'https://mangakakalot.com/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const manhwas = []

        $('.tooltip',html).each(function () {
            const title  = $(this).text()
            const link  = $(this).attr('href')
            manhwas.push({
                title,
                link
            })
        })
        console.log(manhwas)

    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

