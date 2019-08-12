import React, { Component } from "react";
import PropTypes from "prop-types"
import { injectIntl} from 'react-intl';
import {
  Row,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { logoutUser } from "../../constants/authActions"

import PerfectScrollbar from "react-perfect-scrollbar";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
  // authUser
} from "../../redux/actions";


import { menuHiddenBreakpoint, searchPath,localeOptions } from "../../constants/defaultValues";

import notifications from "../../data/topnav.notifications.json"

import avatar from '../../assets/img/profile-pic-l.jpg'
import logo from '../../assets/img/logo-black.svg'
import logomovil from '../../assets/img/logo-mobile.svg'


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleDocumentClickSearch = this.handleDocumentClickSearch.bind(this);
    this.addEventsSearch = this.addEventsSearch.bind(this);
    this.removeEventsSearch = this.removeEventsSearch.bind(this);
    this.handleSignin = this.handleSignin.bind(this)
    // this.onLogoutClick = this.onLogoutClick.bind(this);
    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      authUser: false
    };
  }

  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch() {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  }
  removeEventsSearch() {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  }

  handleDocumentClickSearch(e) {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  }
  handleSearchInputChange(e) {
    this.setState({
      searchKeyword: e.target.value
    });
  }
  handleSearchInputKeyPress(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.props.history.push(searchPath + "/" + this.state.searchKeyword);
    this.setState({
      searchKeyword: ""
    });
  }

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick(e, menuClickCount, containerClassnames) {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  }
  mobileMenuButtonClick(e, containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  }

  handleSignin = e => {
    e.preventDefault()
    return this.props.location.pathname = "signin"
  }

  render() {

    const { containerClassnames, menuClickCount, locale } = this.props;
    const {messages} = this.props.intl;
    return (
      <nav className="navbar fixed-top">
        <Container>

            <Colxx xxl="2">
              <Nav>
                <NavItem>
                  {/*<NavLink className="navbar-logo_left" href="/">
                    <span className="d-none d-xs-block" style={{ background: `url(${logo}) no-repeat`,  width: '100%', height: '100%', backgroundPosition: 'center center'}} />*
                    <span className="d-block d-xs-none" style={{ background: `url(${logomovil}) no-repeat`,  width: '100%', height: '100%', backgroundPosition: 'center center'}} />*/}
                    <button className="mybtn_orange"></button>
                  {/*</NavLink>*/}
                </NavItem>
              </Nav>
            </Colxx>

            <Colxx xxl="10">
              <Nav className="justify-content-end">
              <NavItem>
                <NavLink className="btn btn-outline-danger btn-sm" target="_top"
                  href="https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source"
                >
                  <i className="iconsmind-Shopping-Basket" /> <IntlMessages id="user.buy" />
                </NavLink>
              </NavItem>
                <NavItem >
                  <NavLink tag={Link} to="/index">
                  <IntlMessages id="nav.home" />
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink tag={Link} to="/about">
                  <IntlMessages id="nav.about" />
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink tag={Link} to="/release">
                  <IntlMessages id="nav.release" />
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink tag={Link} to="/api">
                  <IntlMessages id="nav.api" />
                  </NavLink>
                </NavItem>
                <NavItem >
                  <NavLink tag={Link} to="/signin">
                  <IntlMessages id="nav.signin" />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink  to="#">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        color="light"
                        size="sm"
                        className="mylanguage-button"
                      >
                        <span className="name">{locale["locale"]}</span>
                      </DropdownToggle>
                      <DropdownMenu className="mt-3" right>
                      {
                        localeOptions.map((l)=>{
                          return(
                            <DropdownItem onClick={() => this.handleChangeLocale(l.id)} key={l.id}>
                            {l.name}
                          </DropdownItem>
                          )
                        })
                      }
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavLink>
                </NavItem>
              </Nav>

            </Colxx>
        </Container>
      </nav>
    );
  }
}


const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount } = menu;
  const locale = settings;
  return { containerClassnames, menuClickCount, locale };
}

export default injectIntl(connect(
  mapStateToProps,
  { setContainerClassnames, clickOnMobileMenu, changeLocale }
)(Navbar));
