import React from "react";
import getDisplayName from 'react-display-name';
import {anyType} from "../../types";

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

      this._handleChangeItem = this._handleChangeItem.bind(this);
    }

    _handleChangeItem(newItem) {
      if (newItem !== this.state[activeItemName]) {
        this.setState({[activeItemName]: newItem});
      }
    }

    render() {
      const newProps = {
        [activeItemName]: this.state[activeItemName],
        [onItemChangeName]: this._handleChangeItem,
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
