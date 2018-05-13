import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import CssBaseline from "material-ui/CssBaseline";
import Typography from "material-ui/Typography";
import theme from "./theme";
import TicketList from "./components/TicketList";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Link from "./components/Link";
import data from "./data";
import background from "./background.jpg";
import License from "./components/License";

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
    isDarkTheme: false,
    prepared: []
  };

  componentDidMount() {
    const prepared = data
      .filter(isSapsan)
      .map(removeDisabled)
      .sort(cheapSort)
      .map(prepare);

    this.setState({ prepared });
  }

  prepareTheme() {
    const { isDarkTheme } = this.state;

    const result = {
      ...theme,
      palette: {
        ...theme.palette,
        type: isDarkTheme ? "dark" : "light"
      }
    };

    return createMuiTheme(result);
  }

  render() {
    return (
      <MuiThemeProvider theme={this.prepareTheme()}>
        <CssBaseline />
        <ThemeSwitcher onClick={this.handleSwitchTheme} />
        <div style={{ margin: 20, backgroundImage: background }}>
          <Typography variant="headline" gutterBottom>
            Билеты на Сапсан МСК - СПБ
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Данные с{" "}
            <Link href="http://pass.rzd.ru" target="_blank">
              pass.rzd.ru
            </Link>{" "}
            от 12.06.2018
          </Typography>
          <TicketList items={this.state.prepared} />
        </div>
        <License />
      </MuiThemeProvider>
    );
  }

  handleSwitchTheme = () => {
    this.setState(({ isDarkTheme }) => ({
      isDarkTheme: !isDarkTheme
    }));
  };
}

export default App;