import React from "react";
import Header from "../header/header";
import Cities from "../cities/cities";
import {
  favoriteOfferIdsType,
  pathsType,
  citiesType,
  cardStyleType,
  functionType,
  mapType,
  emailType,
} from "../../types";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    const firstExistOffers = Array.from(props.allOffersByCities.entries())
    .find(([_, array]) => {
      return array.length > 0;
    });

    this.state = {
      activeCity: (
        firstExistOffers
          ? firstExistOffers[0]
          : props.cities[0]
      )
    };

    this.handleChangeActiveCity = this.handleChangeActiveCity.bind(this);
  }

  handleChangeActiveCity(evt) {
    const newCity = evt.target.textContent;

    evt.preventDefault();

    if (newCity !== this.state.activeCity) {
      this.setState({activeCity: newCity});
    }
  }

  render() {
    const {
      favoriteOfferIds,
      paths,
      cities,
      cardStyle,
      getRateVisualisation,
      allOffersByCities,
      email,
      onFavoritesChange,
    } = this.props;

    const offersOfActiveCity = allOffersByCities.get(this.state.activeCity);

    const classMain = (
      `page__main page__main--index ${
        offersOfActiveCity.length > 0
          ? ``
          : `page__main--index-empty`
      }`
    );

    return (
      <React.Fragment>
        <div className="page page--gray page--main">
          <Header
            paths={paths}
            email={email}
          />

          <main className={classMain}>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <ul className="locations__list tabs__list">
                  {
                    cities.map((city) => {
                      const classLink = (
                        `locations__item-link tabs__item ${
                          city === this.state.activeCity
                            ? `tabs__item--active`
                            : ``
                        }`
                      );

                      return (
                        <li className="locations__item" key={city}>
                          <a
                            className={classLink}
                            href="#"
                            onClick={this.handleChangeActiveCity}
                          >
                            <span>{city}</span>
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
              </section>
            </div>
            <Cities
              offers={offersOfActiveCity}
              favoriteOfferIds={favoriteOfferIds}
              paths={paths}
              cardStyle={cardStyle}
              getRateVisualisation={getRateVisualisation}
              email={email}
              activeCity={this.state.activeCity}
              onFavoritesChange={onFavoritesChange}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  favoriteOfferIds: favoriteOfferIdsType,
  paths: pathsType,
  cities: citiesType,
  cardStyle: cardStyleType,
  getRateVisualisation: functionType,
  allOffersByCities: mapType,
  email: emailType,
  onFavoritesChange: functionType,
};

export default Main;
