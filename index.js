const puppeteer = require('puppeteer');
const { sleep } = require('./utils.js');

(async () => {
  const waitOptions = { waitUntil: 'networkidle0' };
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--window-size=2000,800'],
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.setDefaultTimeout(30000);

  const BASE_URL = 'https://www.exxon.com/en/find-station';

  await page.goto(BASE_URL, waitOptions);

  await page.click('#onetrust-accept-btn-handler', waitOptions);

  await page.type('#searchInput', 'New York City');

  await sleep(1000);

  await page.click('#searchContainer > div > span > button', waitOptions);

  await sleep(60000); // it takes time to fetch 250 locations

  const results = await page.evaluate(() => {
    let re = /destination=\d+.\d+,\-?\d+.\d+/;
    let search = [...document.querySelector('#search-result').children];

    search = search.map((listItem) => {
      return [...listItem.children[0].children].filter((item, i) => {
        if (i === 1 || i === 4) return item;
      });
    });

    search = search.map((itemList) => {
      let [address, coorinates] = itemList;
      coordinates = coorinates.children[0].outerHTML.match(re) ?? [null];
      return [address.children[2].innerText, coordinates[0]];
    });
    return search;
  });

  console.log(results);
})();
