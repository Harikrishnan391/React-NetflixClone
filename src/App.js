import React from "react";
import "./App.css";
import NavBar from "./components/navbar/navBar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import { originals,action,romance } from "./urls";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost url={originals} title='Netflix Originals' />
      <RowPost url={action} title='Action' isSmall/>
      <RowPost url={romance} title='Romance' isSmall/>
    </div>
  );
}

export default App;
