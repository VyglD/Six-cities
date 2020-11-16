import React from "react";
import {stringType, styleType} from "../../types";

const Container = (props) => {
  const {id, style} = props;

  return (
    <div id={id} style={style}></div>
  );
};

Container.propTypes = {
  id: stringType,
  style: styleType,
};

export default Container;
