import React from "react";
import Cities from "../cities/cities";
import {offersType, componentType, historyType, pathsType, functionType, citiesType} from "../../types";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.offersByCities = props.getOffersByCities(props.offers);

    const offersByActiveCity = Array.from(this.offersByCities.entries())
    .find(([_, array]) => {
      return array.length > 0;
    });

    this.state = {
      activeCity: (
        offersByActiveCity
          ? offersByActiveCity[0]
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
      header,
      getRateVisualisation,
      history,
      paths,
      cities
    } = this.props;


    const relevantOffers = this.offersByCities.get(this.state.activeCity);

    const mainClass = (
      `page__main page__main--index ${
        relevantOffers.length > 0
          ? ``
          : `page__main--index-empty`
      }`
    );

    return (
      <React.Fragment>
        <div className="page page--gray page--main">
          {header}

          <main className={mainClass}>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <ul className="locations__list tabs__list">
                  {
                    cities.map((city) => {
                      const linkClass = (
                        `locations__item-link tabs__item ${
                          city === this.state.activeCity
                            ? `tabs__item--active`
                            : ``
                        }`
                      );

                      return (
                        <li className="locations__item" key={city}>
                          <a
                            className={linkClass}
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
              offers={relevantOffers}
              getRateVisualisation={getRateVisualisation}
              history={history}
              paths={paths}
              activeCity={this.state.activeCity}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  offers: offersType,
  getRateVisualisation: functionType,
  getOffersByCities: functionType,
  header: componentType,
  history: historyType,
  paths: pathsType,
  cities: citiesType,
};

export default Main;
