import React, { Component } from 'react';
import data from './data';

const isSapsan = train => train.brandId === 1;
const getCheaperCar = train => train.seatCars.reduce((car, cheaperCar) => {
  if (Number(car.tariff) < Number(cheaperCar.tariff)) {
    return car;
  }

  return cheaperCar;
}, train.seatCars[0]);

const cheapSort = (trainA, trainB) => {
  const carA = getCheaperCar(trainA);
  const carB = getCheaperCar(trainB);

  if (Number(carA.tariff) < Number(carB.tariff)) {
    return -1;
  } else {
    return 1;
  }
}

const prepare = (train) => {
  const car = getCheaperCar(train);
  const rowDate = train.trDate0.split('.');
  const rowTime = train.trTime0.split(':');
  const date = new Date(rowDate[2], rowDate[1] - 1, rowDate[0], rowTime[0], rowTime[1]);

  return `${date.toLocaleString('ru')} ${train.number} ${car.tariff}\n`;
}

class App extends Component {
  render() {
    const filtered = data.filter(isSapsan);
    const sortered = filtered.sort(cheapSort);
    const prepared = sortered.map(prepare);

    return (
      <pre style={{ margin: 25 }}>
        { prepared }
      </pre>
    );
  }
}

export default App;
