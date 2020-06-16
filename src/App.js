import React, { Fragment } from "react";
import RepositoryPage from './pages/repository'


import "./styles.css";

function App() {



  return (
    <Fragment>
      <div className="container flex">

        <h1>Desafio - GoStack Conceitos Reactjs</h1>
        
        <RepositoryPage />

        
      </div>
    </Fragment>
  );
}

export default App;
