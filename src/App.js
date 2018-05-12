import React, { Component } from "react";
import data from "./data";

const isSapsan = train => train.brandId === 1;
const isNotForDisabled = car => !car.disabledPerson;
const removeDisabled = train => {
  const result = {
    ...train,
    seatCars: train.seatCars.filter(isNotForDisabled)
  };

  return result;
};
const getCheaperCar = cars =>
  cars.reduce((car, cheaperCar) => {
    if (Number(car.tariff) < Number(cheaperCar.tariff)) {
      return car;
    }

    return cheaperCar;
  }, cars[0]);

const cheapSort = (trainA, trainB) => {
  const carA = getCheaperCar(trainA.seatCars);
  const carB = getCheaperCar(trainB.seatCars);

  if (Number(carA.tariff) < Number(carB.tariff)) {
    return -1;
  } else {
    return 1;
  }
};

const prepare = train => {
  const car = getCheaperCar(train.seatCars);
  const rowDate = train.trDate0.split(".");
  const rowTime = train.trTime0.split(":");
  const date = new Date(
    rowDate[2],
    rowDate[1] - 1,
    rowDate[0],
    rowTime[0],
    rowTime[1]
  );

  return `${date.toLocaleString("ru")} ${train.number} ${car.tariff}\n`;
};

class App extends Component {
  render() {
    const prepared = data
      .filter(isSapsan)
      .map(removeDisabled)
      .sort(cheapSort)
      .map(prepare);

    return <pre style={{ margin: 25 }}>{prepared}</pre>;
  }
}

export default App;
