import React from "react";
import Header from "../header/header";
import Cities from "../cities/cities";
import {
  mapType,
} from "../../types";
import {CITIES} from "../../const";

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
          : CITIES[0]
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
      allOffersByCities,
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
            {...this.props}
          />

          <main className={classMain}>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <ul className="locations__list tabs__list">
                  {
                    CITIES.map((city) => {
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
              {...this.props}
              offers={offersOfActiveCity}
              activeCity={this.state.activeCity}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  allOffersByCities: mapType,
};

export default Main;
