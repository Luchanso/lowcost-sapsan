let request = require("request-promise");
const { blue, red } = require("chalk");
const dateformat = require("dateformat");
const fs = require("fs-extra");
const sleep = require("sleep-promise");

const jar = request.jar();
request = request.defaults({ jar });

const BASE_URL = "https://pass.rzd.ru/";
const ONE_DAY = 1000 * 60 * 60 * 24;

const getForm = (date, RID) => {
  const FORM = {
    dir: 0,
    tfl: 3,
    code0: 2000000,
    code1: 2004000,
    dt0: date,
    checkSeats: 1
  };

  if (RID) {
    FORM.rid = RID;
  }

  return FORM;
}

const API = "https://pass.rzd.ru/timetable/public/ru?layer_id=5827";

const saveData = async data => {
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

const getRid = async (date) => {
  const options = {
    uri: API,
    form: getForm(date),
    transform: body => JSON.parse(body),
    jar
  };

  let RID = null;
  for (let i = 0; i < 10 && !RID; i++) {
    console.log(blue(`fetching rid, try: ${i + 1}`));
    const authResult = await request.post(options);
    if (authResult.RID) {
      RID = authResult.RID;
    }
  }

  return RID;
}

const getData = (date, RID) => {
  const options = {
    uri: API,
    form: getForm(date, RID),
    transform: body => JSON.parse(body),
    jar
  };

  return request.post(options);
}

const grab = async (date, counter = 10) => {
  try {
    const rid = await getRid(date);
    await sleep(1500);
    const data = await getData(date, rid);

    if (!data.tp) {
      throw new Error('Not found tp in data');
    }

    return await saveData(data);
  } catch (error) {
    console.log(red(`Error, try: ${10 - counter}`), red(error));
    await sleep(3000);
    return await grab(date, counter - 1);
  }
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
