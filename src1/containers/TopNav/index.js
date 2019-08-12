import React, { Component } from "react";
import PropTypes from "prop-types"
import { injectIntl} from 'react-intl';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";
import IntlMessages from "../../util/IntlMessages";
import { logoutUser } from "../../constants/authActions"

import PerfectScrollbar from "react-perfect-scrollbar";

import { NavLink } from "react-router-dom";
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
import imgCardUser from '../../assets/img/bg-1.jpg'

const iconAvatarWithLetter = (props) => (
  <div className="kt-user-card-v2">
    <div className="kt-user-card-v2__pic">
      <div className="kt-badge kt-badge--xl kt-badge--success">{props.name}</div>
    </div>
  </div>
)


class TopNav extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleDocumentClickSearch = this.handleDocumentClickSearch.bind(this);
    this.addEventsSearch = this.addEventsSearch.bind(this);
    this.removeEventsSearch = this.removeEventsSearch.bind(this);
    // this.onLogoutClick = this.onLogoutClick.bind(this);
    this.state = {
      isInFullScreen: false,
      searchKeyword: "",
      // authUser: false
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

  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser(this.props.history);
  };

  render() {
    const {user} = this.props.authUser

    const { containerClassnames, menuClickCount, locale } = this.props;
    const {messages} = this.props.intl;
    return (
      <nav className="navbar fixed-top">
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e =>
            this.menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <svg
            className="main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 17"
          >
            <rect x="0.48" y="0.5" width="7" height="1" />
            <rect x="0.48" y="7.5" width="7" height="1" />
            <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg
            className="sub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
          >
            <rect x="1.56" y="0.5" width="16" height="1" />
            <rect x="1.56" y="7.5" width="16" height="1" />
            <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
            <rect x="0.5" y="0.5" width="25" height="1" />
            <rect x="0.5" y="7.5" width="25" height="1" />
            <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
        </NavLink>

        <div className="search" data-search-path="/app/pages/search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages["menu.search"]}
            value={this.state.searchKeyword}
            onChange={e => this.handleSearchInputChange(e)}
            onKeyPress={e => this.handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={e => this.handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div>

        <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale["locale"]}</span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-fit dropdown-menu-anim dropdown-menu-top-unround" right>
            {
              localeOptions.map((l)=>{
                return(
                  <DropdownItem onClick={() => this.handleChangeLocale(l.id)} key={l.id}>
                  <i className="iconsmind-Flag-4" /> {l.name}
                </DropdownItem>
                )
              })
            }
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <a className="navbar-logo" href="/">
          <span className="d-none d-xs-block" style={{ background: `url(${logo}) no-repeat`,  width: '100%', height: '100%', backgroundPosition: 'center center'}} />
          <span className="d-block d-xs-none" style={{ background: `url(${logomovil}) no-repeat`,  width: '100%', height: '100%', backgroundPosition: 'center center'}} />
        </a>

        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            <div className="position-relative d-none d-none d-lg-inline-block">
              <a
                className="btn btn-outline-primary btn-sm mb-2 mr-3" target="_top"
                href="https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source"
              >
                <IntlMessages id="user.buy" />
              </a>
            </div>
            <div className="position-relative d-none d-sm-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle className="header-icon" color="empty">
                  <i className="simple-icon-grid" />
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3 dropdown-menu-anim"
                  right
                  id="iconMenuDropdown"
                >
                  <NavLink
                    to="/app/dashboards/default"
                    className="icon-menu-item"
                  >
                    <i className="iconsmind-Shop-4 d-block" />{" "}
                    <IntlMessages id="menu.dashboard" />
                  </NavLink>

                  <NavLink to="/app/ui" className="icon-menu-item">
                    <i className="iconsmind-Pantone d-block" />{" "}
                    <IntlMessages id="menu.ui" />
                  </NavLink>
                  <NavLink to="/app/ui/charts" className="icon-menu-item">
                    <i className="iconsmind-Bar-Chart d-block" />{" "}
                    <IntlMessages id="menu.charts" />
                  </NavLink>
                  <NavLink
                    to="/app/applications/chat"
                    className="icon-menu-item"
                  >
                    <i className="iconsmind-Speach-BubbleDialog d-block" />{" "}
                    <IntlMessages id="menu.chat" />
                  </NavLink>
                  <NavLink
                    to="/app/applications/survey"
                    className="icon-menu-item"
                  >
                    <i className="iconsmind-Formula d-block" />{" "}
                    <IntlMessages id="menu.survey" />
                  </NavLink>
                  <NavLink
                    to="/app/applications/todo"
                    className="icon-menu-item"
                  >
                    <i className="iconsmind-Check d-block" />{" "}
                    <IntlMessages id="menu.todo" />
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <div className="position-relative d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle
                  className="header-icon notificationButton"
                  color="empty"
                >
                  <i className="simple-icon-bell" />
                  <span className="count">{notifications.data.length}</span>
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3 scroll dropdown-menu-anim"
                  right
                  id="notificationDropdown"
                >
                  <PerfectScrollbar
                    options={{ suppressScrollX: true, wheelPropagation: false }}
                  >
                    {notifications.data.map((n, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex flex-row mb-3 pb-3 border-bottom"
                        >
                          <a href="/app/pages/details">
                            <img
                              src={require("../../assets/img/"+n.image)}
                              alt="Notification"
                              className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                            />
                          </a>
                          <div className="pl-3 pr-2">
                            <a href="/app/pages/details">
                              <p className="font-weight-medium mb-1">
                                {n.message}
                              </p>
                              <p className="text-muted mb-0 text-small">
                                {n.date}
                              </p>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </PerfectScrollbar>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">

               <div className="kt-user-card-v2">
                 <div className="kt-user-card-v2__pic">
                   {user.avatar
                     ? <img alt="Profile" src={user.avatar} />
                     : <div className="kt-badge kt-badge--xl kt-badge--success">{user.username.slice(0,1).toUpperCase()}</div>
                   }
                </div>
                <div className="kt-user-card-v2__details">
                  <a className="kt-user-card-v2__name">Hi, {user.username}</a>
                  <span className="kt-user-card-v2__desc">{user.occupation}</span>
                </div>
    					</div>

                {/*<span className="name mr-1">Hi, {user.username}</span>*/}

              </DropdownToggle>
              <DropdownMenu className="mt-3 dropdown-menu-anim dropdown-menu-xl" right>
                <div className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x" style={{ backgroundImage: `url(${imgCardUser})` }} >
									<div className="kt-user-card__avatar">
                    <img className="kt-hidden" alt="Pic" style={{ backgroundImage: `url()` }} />
										<span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">S</span>
									</div>
									<div className="kt-user-card__name">
										{user.name}
									</div>
									<div className="kt-user-card__badge">
										<span className="btn btn-success btn-sm btn-bold btn-font-md">23 messages</span>
									</div>
								</div>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem>Features</DropdownItem>
                <DropdownItem>History</DropdownItem>
                <DropdownItem>Support</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.onLogoutClick}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

TopNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  // authUser: PropTypes.object.isRequired
}

const mapStateToProps = ({ menu, settings, authUser }) => {
  // const user = authUser
  const { containerClassnames, menuClickCount } = menu;
  const locale = settings;
  // console.log("==== User_Navbar ====:", authUser.user.username)
  return { containerClassnames, menuClickCount, locale, authUser/*, user*/ };
}

export default injectIntl(connect(
  mapStateToProps,
  { setContainerClassnames, clickOnMobileMenu, changeLocale, logoutUser }
)(TopNav));
