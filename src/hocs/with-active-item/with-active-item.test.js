import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withActiveItem(MockComponent);

it(`Render correctly hoc withActiveItem`, () => {
  const component = renderer.create((
    <MockComponentWrapped>
      <React.Fragment />
    </MockComponentWrapped>
  )).toJSON();

  expect(component).toMatchSnapshot();
});
