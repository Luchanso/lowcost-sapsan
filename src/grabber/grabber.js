let request = require("request-promise");
const { blue } = require("chalk");
const dateformat = require("dateformat");
const fs = require("fs-extra");
const sleep = require("sleep-promise");

var jar = request.jar();
request = request.defaults({ jar });

const BASE_URL = "https://pass.rzd.ru/";
const ONE_DAY = 1000 * 60 * 60 * 24;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36";

const saveData = async data => {
  console.log(data.tp);
  const list = data.tp[0].list;
  console.log(blue("saving data"));

  let rowStr = "[]";
  try {
    rowStr = await fs.readFile("src/data.json");
  } catch (error) {}
  const parsedData = JSON.parse(rowStr);
  return fs.writeFile(
    "src/data.json",
    JSON.stringify([...parsedData, ...list])
  );
};
const cleanData = async () => {
  try {
    await fs.unlink("src/data.json");
  } catch (error) {}
};

const grab = async date => {
  const form = {
    dir: 0,
    tfl: 3,
    code0: 2000000,
    code1: 2004000,
    dt0: date,
    checkSeats: 1
  };
  const options = {
    uri: "https://pass.rzd.ru/timetable/public/ru?layer_id=5827",
    form,
    transform: body => JSON.parse(body),
    jar
  };

  console.log(blue("fetching rid"));
  const { RID } = await request.post(options);
  options.form.rid = RID;
  await sleep(1500);
  console.log(blue("fetching data"));
  const result = await request.post(options);
  await saveData(result);
};

(async () => {
  await cleanData();

  for (let i = 0; i < 90; i++) {
    const date = new Date(Date.now() + ONE_DAY * i);
    console.log(blue("grab"), "for", date.toDateString());
    await grab(dateformat(date, "dd.mm.yyyy"));
    await sleep(1000);
  }
})();
