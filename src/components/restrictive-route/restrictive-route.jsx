import React from "react";
import {Route, Redirect} from "react-router-dom";
import {boolType, pathType, functionType} from "../../types";


const RestrictiveRoute = (props) => {
  const {render, path, redirectPath, exact, condition} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          condition
            ? render(routeProps)
            : <Redirect to={redirectPath} />
        );
      }}
    />
  );
};

RestrictiveRoute.propTypes = {
  condition: boolType,
  exact: boolType,
  path: pathType,
  redirectPath: pathType,
  render: functionType,
};

export default RestrictiveRoute;
