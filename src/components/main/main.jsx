import React from "react";
import Header from "../header/header";
import MainContent from "../main-content/main-content";

const Main = (props) => {
  return (
    <React.Fragment>
      <div className="page page--gray page--main">
        <Header
          {...props}
        />
        <MainContent
          {...props}
        />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {};

export default Main;
