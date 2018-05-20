import CssBaseline from "material-ui/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import React, { Component } from "react";
import theme from "./theme";
import Root from "./components/Root";

class App extends Component {
  render() {
    const { classes } = this.props;
    const muiTheme = createMuiTheme(theme);
    const { spacing } = muiTheme;

    return (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Root />
      </MuiThemeProvider>
    );
  }
}

export default App;
