import React from "react";
import {connect} from "react-redux";
import Header from "../header/header";
import Cities from "../cities/cities";
import {
  cityNameType,
  functionType,
  offersType,
} from "../../types";
import {City} from "../../const";
import {ActionCreater} from "../../store/action";

class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeActiveCity = this.handleChangeActiveCity.bind(this);
  }

  handleChangeActiveCity(evt) {
    const {changeActiveCity, activeCity} = this.props;
    const newCity = evt.target.textContent;

    evt.preventDefault();

    if (newCity !== activeCity) {
      changeActiveCity(newCity);
    }
  }

  render() {
    const {activeCity, offers} = this.props;

    return (
      <React.Fragment>
        <div className="page page--gray page--main">
          <Header
            {...this.props}
          />

          <main
            className={
              `page__main page__main--index ${
                offers.length === 0 && `page__main--index-empty`
              }`
            }
          >
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <ul className="locations__list tabs__list">
                  {
                    Object.entries(City).map(([_, values]) => {
                      const city = values.name;
                      const activeClass = (city === activeCity) && `tabs__item--active`;

                      return (
                        <li className="locations__item" key={city}>
                          <a
                            className={
                              `locations__item-link tabs__item ${activeClass}`
                            }
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
              offers={offers}
              activeCity={activeCity}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  activeCity: cityNameType,
  offers: offersType,
  changeActiveCity: functionType,
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveCity(newCity) {
    dispatch(ActionCreater.changeActiveCity(newCity));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
