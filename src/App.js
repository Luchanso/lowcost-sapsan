import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import CssBaseline from 'material-ui/CssBaseline';
import Typography from "material-ui/Typography";
import theme from "./theme";
import TicketList from "./components/TicketList";
import ThemeSwitcher from './components/ThemeSwitcher';
import data from "./data";
import background from "./background.jpg";

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

  return {
    date: date.toLocaleString("ru"),
    train: train.number,
    price: car.tariff
  };
};

class App extends Component {
  state = {
    isDarkTheme: false
  };

  prepareTheme() {
    const { isDarkTheme } = this.state;

    const result = {
      ...theme,
      palette: {
        ...theme.palette,
        type: isDarkTheme ? 'dark' : 'light'
      }
    }

    return createMuiTheme(result);
  }

  render() {
    const prepared = data
      .filter(isSapsan)
      .map(removeDisabled)
      .sort(cheapSort)
      .map(prepare);

    return (
      <MuiThemeProvider theme={this.prepareTheme()}>
        <CssBaseline />
        <ThemeSwitcher onClick={this.handleSwitchTheme} />
        <div style={{ margin: 20, backgroundImage: background }}>
          <Typography variant="headline" gutterBottom>
            Билеты на Сапсан МСК - СПБ
          </Typography>
          <TicketList items={prepared} />
        </div>
      </MuiThemeProvider>
    );
  }

  handleSwitchTheme = () => {
    this.setState(({ isDarkTheme }) => ({
      isDarkTheme: !isDarkTheme
    }));
  }
}

export default App;