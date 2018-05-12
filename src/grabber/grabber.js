const puppeteer = require("puppeteer");
const dateformat = require("dateformat");
const fs = require("fs");
const URL = require("URL");
const selectors = require("./selectors");
const { blue, red } = require("chalk");

const BASE_URL = "https://pass.rzd.ru/";
const ONE_DAY = 1000 * 60 * 60 * 24;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36";

const logger = interceptedRequest => {
  const url = URL.parse(interceptedRequest.url());
  console.log(`${blue("request")}: ${url.host} ${url.pathname.slice(0, 10)}`);
};
const responseHook = async response => {
  const url = response.url();
  if (url.indexOf("https://pass.rzd.ru/timetable/public/ru") !== -1) {
    const data = await response.json();

    if (data.tp) {
      saveData(data);
    }
  }
};
const urlFilter = async request => {
  const url = URL.parse(request.url());
  if (url.host !== "pass.rzd.ru") {
    console.log(red("block"), url.host);
    request.abort("aborted");
  } else {
    request.continue();
  }
};

const saveData = data => {
  const list = data.tp[0].list;

  console.log(blue("save data"));

  fs.readFile("src/data.json", (err, rowStr) => {
    let parsedData = [];

    if (rowStr && !err) {
      parsedData = JSON.parse(rowStr);
    }
    fs.writeFile(
      "src/data.json",
      JSON.stringify([...parsedData, ...list]),
      () => {}
    );
  });
};

(async () => {
  fs.unlink("src/data.json", () => {});

  const browser = await puppeteer.launch({
    devtools: false
  });
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  await page.setCacheEnabled(true);
  await page.setUserAgent(USER_AGENT);
  await page.setDefaultNavigationTimeout(45000);
  await page.setRequestInterception(true);
  await page.setViewport({ width: 1600, height: 700 });

  page.on("request", logger);
  page.on("request", urlFilter);
  page.on("response", responseHook);

  for (let i = 0; i < 90; i++) {
    const date = new Date(Date.now() + ONE_DAY * i);
    console.log(blue("grab"), "for", date.toDateString());
    await grab(page, browser, dateformat(date, "dd.mm.yyyy"), 10);
    await page.waitFor(1000);
  }

  await browser.close();
})();

const grab = async (page, browser, date, retry) => {
  try {
    await page.goto(BASE_URL);

    console.log(blue("Opened base page"));
    await page.click(selectors.mainFrom);
    await page.click(selectors.mainTo);
    const inputDate = await page.$(selectors.mainDateInput);
    for (let i = 0; i < 10; i++) {
      await inputDate.press("Backspace", { delay: 50 });
    }
    await inputDate.type(date, { delay: 50 });

    await page.screenshot({ path: "screenshots/main-presubmit.png" });

    console.log(blue("field inputs"));
    await page.click(selectors.mainSubmit);
    await page.waitForSelector(selectors.ticketsList);

    await page.screenshot({ path: "screenshots/main-aftersubmit.png" });
  } catch (error) {
    console.error(error);
    console.log(blue("retries:"), retry);
    await page.waitFor(5000);
    if (retry > 0) {
      await grab(page, browser, date, retry - 1);
    }
  }
};
