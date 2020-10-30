import React from "react";
import {anyType} from "../../types";
import getDisplayName from 'react-display-name';

const withActiveItem = (
    Component,
    {
      initialActiveItem = null,
      activeItemName = `activeItem`,
      onItemChangeName = `onItemChange`,
    }
) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        [activeItemName]: props.activeItem ? props.activeItem : initialActiveItem,
      };

      this.handleChangeItem = this.handleChangeItem.bind(this);
    }

    handleChangeItem(newItem) {
      if (newItem !== this.state[activeItemName]) {
        this.setState({[activeItemName]: newItem});
      }
    }

    render() {
      const newProps = {
        [activeItemName]: this.state[activeItemName],
        [onItemChangeName]: this.handleChangeItem,
      };

      return (
        <Component
          {...this.props}
          {...newProps}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    activeItem: anyType
  };

  WithActiveItem.displayName = `With_${activeItemName}(${getDisplayName(Component)})`;

  return WithActiveItem;
};

export default withActiveItem;
