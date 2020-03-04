const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://magic.wizards.com/en/articles/archive/mtgo-standings/standard-preliminary-2020-03-03';

axios(url)
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html)
  $('span.card-count').each(function(i,element){
    var a = $(this);
    var b = $(this).next();
    console.log(a.text(), b.text());
  })

})
.catch(console.error);
