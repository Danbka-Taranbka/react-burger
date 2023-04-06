import React from "react";
import appStyles from './app.module.css';
import data from "../../utils/data.js";
import AppHeader from '../app-header/app-header.js';
import Main from "../main/main.js";

class App extends React.Component {
  render() {
    return(
      <div className={`${appStyles.app}`}>
      <AppHeader />
      <Main data={data}/>
      </div>
    )
  } 
}

export default App;