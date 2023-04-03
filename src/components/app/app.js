import React from "react";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.js'

class App extends React.Component {
  render() {
    return(
      <>
      <AppHeader className={appStyles.app}/>
      </>
    )
  } 
}

export default App;