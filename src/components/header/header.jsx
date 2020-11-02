import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {boolType, emailType} from "../../types";
import {Path} from "../../const";

const Header = (props) => {
  const {isLogin, email} = props;

  const loginHref = isLogin ? Path.FAVORITES : Path.LOGIN;
  const loginInnards = (
    isLogin
      ? <span className="header__user-name user__name">{email}</span>
      : <span className="header__login">Sign in</span>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link"
              to={Path.MAIN}
            >
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={loginHref}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"/>
                  {loginInnards}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isLogin: boolType,
  email: emailType,
};

const mapStateToProps = ({USER}) => ({
  isLogin: USER.isLogin,
  email: USER.email,
});

export {Header};
export default connect(mapStateToProps)(Header);
