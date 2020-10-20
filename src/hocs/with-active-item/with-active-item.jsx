import React from "react";
import {anyType} from "../../types";

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem,
      };

      this.handleChangeItem = this.handleChangeItem.bind(this);
    }

    handleChangeItem(newItem) {
      if (newItem !== this.state.activeItem) {
        this.setState({activeItem: newItem});
      }
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onItemChange={this.handleChangeItem}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    activeItem: anyType
  };

  return WithActiveItem;
};

export default withActiveItem;
