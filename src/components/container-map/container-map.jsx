import React from "react";
import Container from "../container/container";

import withMap from "../../hocs/with-map/with-map";

const ContainerMap = (props) => {

  return (
    <Container
      id={`map`}
      style={{height: `100%`}}
      {...props}
    />
  );
};

export {ContainerMap};
export default withMap(ContainerMap);
