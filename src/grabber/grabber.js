let request = require("request-promise");
const { blue } = require("chalk");
const dateformat = require("dateformat");
const fs = require("fs");

// request.debug = true;
var jar = request.jar();
request = request.defaults({ jar });

const BASE_URL = "https://pass.rzd.ru/";
const ONE_DAY = 1000 * 60 * 60 * 24;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36";

const grab = async date => {
  const formData = {
    dir: 0,
    tfl: 3,
    code0: 2000000,
    code1: 2004000,
    dt0: date,
    checkSeats: 1
  };
  const options = {
    uri: "https://pass.rzd.ru/timetable/public/ru?layer_id=5827",
    formData,
    transform: body => JSON.parse(body),
    jar
  };

  const { RID } = await request.post(options);
  const result = await request.post({
    ...options,
    formData: {
      ...formData,
      rid: RID
    }
  });


  console.log({
    ...options,
    formData: {
      ...formData,
      rid: RID
    }
  });
  console.log(blue(JSON.stringify(result)));
  // console.log(jar);
};

(async () => {
  for (let i = 0; i < 1; i++) {
    const date = new Date(Date.now() + ONE_DAY * i);
    console.log(blue("grab"), "for", date.toDateString());
    await grab(dateformat(date, "dd.mm.yyyy"));
  }
})();
