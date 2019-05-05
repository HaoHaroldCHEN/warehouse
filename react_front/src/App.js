import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './Components/Header';
import Layout from './Components/Layout';
import Footer from './Components/Footer';

//define theme
const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: '#ffe200',
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <Router forceRefresh="true">
        <MuiThemeProvider theme={theme}>
          <Header />
          <Route path="*" component={Layout} />
          <Footer />
        </MuiThemeProvider>      
      </Router>
    )
  }
}

export default App;
