import {isMaster} from "cluster";
import {Master} from "./master";
import {Slave} from "./slave";

// if (isMaster) {
//   new Master();
// } else {
//   new Slave();
// }

// new Slave();


//
// import {pid} from "process";
// import * as cluster from "cluster";
// import * as puppeteer from "puppeteer";

import {launch} from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1');
  await page.goto('https://betam.trendyol.com', {waitUntil: 'networkidle0'});

  await page.evaluate(() => {
    return new Promise((resolve) => {
      const images = Array.from(document.querySelectorAll("img"));

      for (let i = 0, len = images.length; i < len; i++) {
        const img = images[i] as HTMLImageElement;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
      }

      setTimeout(resolve, 500);
    })
  });


  const a = await page.screenshot({fullPage: true});

  fs.writeFileSync('logo.png', a, 'binary');

  await browser.close();
})();
