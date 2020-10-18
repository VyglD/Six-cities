import React from 'react';
import {offersType, stringType} from '../../types';

const withParentWrapping = (Component) => {
  const WithItems = (props) => {
    const {offers, wrappingClass} = props;

    return (
      <div className={wrappingClass}>

        {offers.map((offer) => (
          <Component
            key={offer.id}
            {...props}
            offer={offer}
          />
        ))}

      </div>
    );
  };

  WithItems.propTypes = {
    offers: offersType,
    wrappingClass: stringType,
  };

  return WithItems;
};

export default withParentWrapping;
