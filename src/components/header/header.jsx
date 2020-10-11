import React from "react";
import {emailType, historyType, pathsType} from "../../types";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleLogoClick(evt) {
    const {history, paths} = this.props;

    evt.preventDefault();

    history.push(paths.MAIN);
  }

  handleSignInClick(evt) {
    const {history, paths} = this.props;

    evt.preventDefault();

    history.push(paths.LOGIN);
  }

  render() {
    const {email} = this.props;

    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a
                className="header__logo-link"
                href="main.html"
                onClick={this.handleLogoClick}
              >
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                    onClick={this.handleSignInClick}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {
                      email
                        ? <span className="header__user-name user__name">{email}</span>
                        : <span className="header__login">Sign in</span>
                    }
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  history: historyType,
  paths: pathsType,
  email: emailType,
};

export default Header;
