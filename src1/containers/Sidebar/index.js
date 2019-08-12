import React, { Component } from "react";
import ReactDOM from "react-dom";
import IntlMessages from "../../util/IntlMessages";
import { Nav, NavItem } from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

import { connect } from "react-redux";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames
} from "../../redux/actions";

// icons menu
const iconDash = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon icons-sidebar"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="48" height="48"/><path d="M11,20 L11,17 C11,16.4477153 11.4477153,16 12,16 C12.5522847,16 13,16.4477153 13,17 L13,20 L15.5,20 C15.7761424,20 16,20.2238576 16,20.5 C16,20.7761424 15.7761424,21 15.5,21 L8.5,21 C8.22385763,21 8,20.7761424 8,20.5 C8,20.2238576 8.22385763,20 8.5,20 L11,20 Z" id="Combined-Shape" fill="#000000" opacity="0.3"/><path d="M3,5 L21,5 C21.5522847,5 22,5.44771525 22,6 L22,16 C22,16.5522847 21.5522847,17 21,17 L3,17 C2.44771525,17 2,16.5522847 2,16 L2,6 C2,5.44771525 2.44771525,5 3,5 Z M4.5,8 C4.22385763,8 4,8.22385763 4,8.5 C4,8.77614237 4.22385763,9 4.5,9 L13.5,9 C13.7761424,9 14,8.77614237 14,8.5 C14,8.22385763 13.7761424,8 13.5,8 L4.5,8 Z M4.5,10 C4.22385763,10 4,10.2238576 4,10.5 C4,10.7761424 4.22385763,11 4.5,11 L7.5,11 C7.77614237,11 8,10.7761424 8,10.5 C8,10.2238576 7.77614237,10 7.5,10 L4.5,10 Z" id="Combined-Shape" fill="#000000"/></g></svg>'

const iconSettings = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon icons-sidebar"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="bound" points="0 0 24 0 24 24 0 24"/><path d="M22,15 L22,19 C22,20.1045695 21.1045695,21 20,21 L8,21 C5.790861,21 4,19.209139 4,17 C4,14.790861 5.790861,13 8,13 L20,13 C21.1045695,13 22,13.8954305 22,15 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3"/><path d="M15.5421357,5.69999981 L18.3705628,8.52842693 C19.1516114,9.30947552 19.1516114,10.5758055 18.3705628,11.3568541 L9.88528147,19.8421354 C8.3231843,21.4042326 5.79052439,21.4042326 4.22842722,19.8421354 C2.66633005,18.2800383 2.66633005,15.7473784 4.22842722,14.1852812 L12.7137086,5.69999981 C13.4947572,4.91895123 14.7610871,4.91895123 15.5421357,5.69999981 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3"/><path d="M5,3 L9,3 C10.1045695,3 11,3.8954305 11,5 L11,17 C11,19.209139 9.209139,21 7,21 C4.790861,21 3,19.209139 3,17 L3,5 C3,3.8954305 3.8954305,3 5,3 Z M7,19 C8.1045695,19 9,18.1045695 9,17 C9,15.8954305 8.1045695,15 7,15 C5.8954305,15 5,15.8954305 5,17 C5,18.1045695 5.8954305,19 7,19 Z" id="Combined-Shape" fill="#000000"/></g></svg>'

const iconUsers = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon icons-sidebar"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"/><path d="M18,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,19 C23,20.6568542 21.6568542,22 20,22 L18,22 L18,2 Z" id="Rectangle-161-Copy" fill="#000000" opacity="0.3"/><path d="M5,2 L17,2 C18.6568542,2 20,3.34314575 20,5 L20,19 C20,20.6568542 18.6568542,22 17,22 L5,22 C4.44771525,22 4,21.5522847 4,21 L4,3 C4,2.44771525 4.44771525,2 5,2 Z M12,11 C13.1045695,11 14,10.1045695 14,9 C14,7.8954305 13.1045695,7 12,7 C10.8954305,7 10,7.8954305 10,9 C10,10.1045695 10.8954305,11 12,11 Z M7.00036205,16.4995035 C6.98863236,16.6619875 7.26484009,17 7.4041679,17 C11.463736,17 14.5228466,17 16.5815,17 C16.9988413,17 17.0053266,16.6221713 16.9988413,16.5 C16.8360465,13.4332455 14.6506758,12 11.9907452,12 C9.36772908,12 7.21569918,13.5165724 7.00036205,16.4995035 Z" id="Combined-Shape" fill="#000000"/></g></svg>'

const iconTask = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon icons-sidebar"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"/><path d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z" id="Combined-Shape" fill="#000000" opacity="0.3"/><path d="M10.875,15.75 C10.6354167,15.75 10.3958333,15.6541667 10.2041667,15.4625 L8.2875,13.5458333 C7.90416667,13.1625 7.90416667,12.5875 8.2875,12.2041667 C8.67083333,11.8208333 9.29375,11.8208333 9.62916667,12.2041667 L10.875,13.45 L14.0375,10.2875 C14.4208333,9.90416667 14.9958333,9.90416667 15.3791667,10.2875 C15.7625,10.6708333 15.7625,11.2458333 15.3791667,11.6291667 L11.5458333,15.4625 C11.3541667,15.6541667 11.1145833,15.75 10.875,15.75 Z" id="check-path" fill="#000000"/><path d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z" id="Combined-Shape" fill="#000000"/></g></svg>'

const iconTicket = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon icons-sidebar"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"/><path d="M3,10.0500091 L3,8 C3,7.44771525 3.44771525,7 4,7 L9,7 L9,9 C9,9.55228475 9.44771525,10 10,10 C10.5522847,10 11,9.55228475 11,9 L11,7 L21,7 C21.5522847,7 22,7.44771525 22,8 L22,10.0500091 C20.8588798,10.2816442 20,11.290521 20,12.5 C20,13.709479 20.8588798,14.7183558 22,14.9499909 L22,17 C22,17.5522847 21.5522847,18 21,18 L11,18 L11,16 C11,15.4477153 10.5522847,15 10,15 C9.44771525,15 9,15.4477153 9,16 L9,18 L4,18 C3.44771525,18 3,17.5522847 3,17 L3,14.9499909 C4.14112016,14.7183558 5,13.709479 5,12.5 C5,11.290521 4.14112016,10.2816442 3,10.0500091 Z M10,11 C9.44771525,11 9,11.4477153 9,12 L9,13 C9,13.5522847 9.44771525,14 10,14 C10.5522847,14 11,13.5522847 11,13 L11,12 C11,11.4477153 10.5522847,11 10,11 Z" id="Combined-Shape-Copy" fill="#000000" opacity="0.3" transform="translate(12.500000, 12.500000) rotate(-45.000000) translate(-12.500000, -12.500000) "/></g></svg>'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this);
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this);

    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: "",
    };
  }

  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  handleDocumentClick(e) {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    }
    if (
      (container.contains(e.target) || container === e.target) ||
      isMenuClick
    ) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu: ""
    })
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(" ").filter(x => x != "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x != "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter(x => x != "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(x => x != "menu-sub-hidden");
      }
    }
    return nextClasses;
  }

  getContainer() {
    return ReactDOM.findDOMNode(this);
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x != "")
      : "";

    if (currentClasses.includes("menu-sub-hidden") && menuClickCount == 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  }

  handleProps() {
    this.addEvents();
  }

  addEvents() {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }
  removeEvents() {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }
  setSelectedLiActive() {
    const oldli = document.querySelector(".sub-menu  li.active");
    if (oldli != null) {
      oldli.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          "data-parent"
        )
      });
    } else {
      var selectedParentNoSubItem = document.querySelector(".main-menu  li a.active");
      if (selectedParentNoSubItem != null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            "data-flag"
          )
        });
      } else if (this.state.selectedParentMenu == "") {
        this.setState({
          selectedParentMenu: "dashboards"
        });
      }

    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive();
      this.toggle();
      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault();
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  openSubMenu(e, selectedParent) {
    e.preventDefault();
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x != "")
      : "";

    if (!currentClasses.includes("menu-mobile")) {
      if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount == 2 || menuClickCount == 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames);
      } else if (
        currentClasses.includes("menu-hidden") &&
        (menuClickCount == 1 || menuClickCount == 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames);
      } else if (
        currentClasses.includes("menu-default") &&
        !currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount == 1 || menuClickCount == 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames);
      }
    } else {
      this.props.addContainerClassname(
        "sub-show-temporary",
        containerClassnames
      );
    }
    this.setState({
      viewingParentMenu: selectedParent
    });
  }
  changeViewingParentMenu(menu) {
    this.toggle();

    this.setState({
      viewingParentMenu: menu
    })
  }

  render() {
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "dashboards" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "dashboards")
                  })}
                >
                  <NavLink
                    to="/app/dashboard"
                    onClick={e => this.openSubMenu(e, "dashboards")}
                  >
                    <div dangerouslySetInnerHTML={{ __html: iconDash }} />{" "}
                    <IntlMessages id="menu.dashboard" />
                  </NavLink>
                </NavItem>


                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "settings" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "settings")
                  })}
                >
                  <NavLink
                    to="/app/settings"
                    onClick={e => this.openSubMenu(e, "settings")}
                  >
                    <div dangerouslySetInnerHTML={{ __html: iconSettings }} />{" "}
                    <IntlMessages id="menu.settings" />
                  </NavLink>
                </NavItem>


                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "tickets" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "tickets")
                  })}
                >
                  <NavLink
                    to="/app/tickets"
                    onClick={e => this.openSubMenu(e, "tickets")}
                  >
                    <div dangerouslySetInnerHTML={{ __html: iconTicket }} />{" "}
                    <IntlMessages id="menu.tickets" />
                  </NavLink>
                </NavItem>


                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "tasks" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "tasks")
                  })}
                >
                  <NavLink
                    to="/app/tasks"
                    onClick={e => this.openSubMenu(e, "tasks")}
                  >
                    <div dangerouslySetInnerHTML={{ __html: iconTask }} />{" "}
                    <IntlMessages id="menu.tasks" />
                  </NavLink>
                </NavItem>


                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "users" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "users")
                  })}
                >
                  <NavLink
                    to="/app/users/list"
                    onClick={e => this.openSubMenu(e, "users")}
                  >
                    <div dangerouslySetInnerHTML={{ __html: iconUsers }} />{" "}
                    <IntlMessages id="menu.users" />
                  </NavLink>
                </NavItem>


                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "pages" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "pages")
                  })}
                >
                  <NavLink
                    to="/app/pages"
                    onClick={e => this.openSubMenu(e, "pages")}
                  >
                    <i className="iconsmind-Digital-Drawing" />{" "}
                    <IntlMessages id="menu.pages" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "applications" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "applications")
                  })}
                >
                  <NavLink
                    to="/app/applications"
                    onClick={e => this.openSubMenu(e, "applications")}
                  >
                    <i className="iconsmind-Air-Balloon" />{" "}
                    <IntlMessages id="menu.applications" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "ui" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "ui")
                  })}
                >
                  <NavLink
                    to="/app/ui"
                    onClick={e => this.openSubMenu(e, "ui")}
                  >
                    <i className="iconsmind-Pantone" />{" "}
                    <IntlMessages id="menu.ui" />
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.state.selectedParentMenu == "menu" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "menu")
                  })}
                >
                  <NavLink
                    to="/app/menu"
                    onClick={e => this.openSubMenu(e, "menu")}
                  >
                    <i className="iconsmind-Three-ArrowFork" />{" "}
                    <IntlMessages id="menu.menu" />
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "dashboards" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "dashboards")
                })}
                data-parent="dashboards"
              >
                <NavItem>
                  <NavLink to="/app/dashboard">
                    <i className="simple-icon-briefcase" />{" "}
                    <IntlMessages id="menu.home" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "settings" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "settings")
                })}
                data-parent="settings"
              >
                <NavItem>
                  <NavLink to="/app/settings/list">
                    <i className="iconsmind-Find-User" />{" "}
                    <IntlMessages id="menu.settings.list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/settings/add">
                    <i className="iconsmind-Add-User" />{" "}
                    <IntlMessages id="menu.settings.add" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "tickets" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "tickets")
                })}
                data-parent="tickets"
              >
                <NavItem>
                  <NavLink to="/app/tickets/list">
                    <i className="iconsmind-Find-User" />{" "}
                    <IntlMessages id="menu.tickets.list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/tickets/add">
                    <i className="iconsmind-Add-User" />{" "}
                    <IntlMessages id="menu.tickets.add" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "tasks" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "tasks")
                })}
                data-parent="tasks"
              >
                <NavItem>
                  <NavLink to="/app/tasks/list">
                    <i className="iconsmind-Find-User" />{" "}
                    <IntlMessages id="menu.tasks.list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/tasks/add">
                    <i className="iconsmind-Add-User" />{" "}
                    <IntlMessages id="menu.tasks.add" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "users" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "users")
                })}
                data-parent="users"
              >
                <NavItem>
                  <NavLink to="/app/users/list">
                    <i className="iconsmind-Find-User" />{" "}
                    <IntlMessages id="menu.user.list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/users/add">
                    <i className="iconsmind-Add-User" />{" "}
                    <IntlMessages id="menu.user.add" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "pages" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "pages")
                })}
                data-parent="pages"
              >
                <NavItem>
                  <NavLink to="/app/pages/data-list">
                    <i className="simple-icon-credit-card" />{" "}
                    <IntlMessages id="menu.data-list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/pages/thumb-list">
                    <i className="simple-icon-list" />{" "}
                    <IntlMessages id="menu.thumb-list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/pages/image-list">
                    <i className="simple-icon-grid" />{" "}
                    <IntlMessages id="menu.image-list" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/pages/details">
                    <i className="simple-icon-book-open" />{" "}
                    <IntlMessages id="menu.details" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/pages/search">
                    <i className="simple-icon-magnifier" />{" "}
                    <IntlMessages id="menu.search" />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to="/app/pages/mailing">
                    <i className="simple-icon-envelope-open" />{" "}
                    <IntlMessages id="menu.mailing" />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to="/app/pages/invoice">
                    <i className="simple-icon-bag" />{" "}
                    <IntlMessages id="menu.invoice" />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <a href="/signin" target="_blank">
                    <i className="simple-icon-user-following" />{" "}
                    <IntlMessages id="menu.login" />
                  </a>
                </NavItem>
                <NavItem>
                  <a href="/register" target="_blank">
                    <i className="simple-icon-user-follow" />{" "}
                    <IntlMessages id="menu.register" />
                  </a>
                </NavItem>
                <NavItem>
                  <a href="/forgot-password" target="_blank">
                    <i className="simple-icon-user-unfollow" />{" "}
                    <IntlMessages id="menu.forgot-password" />
                  </a>
                </NavItem>
                <NavItem>
                  <a href="/404" target="_blank">
                    <i className="simple-icon-exclamation" />{" "}
                    <IntlMessages id="menu.error" />
                  </a>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "applications" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "applications")
                })}
                data-parent="applications"
              >
                <NavItem>
                  <NavLink to="/app/applications/todo">
                    <i className="simple-icon-check" />{" "}
                    <IntlMessages id="menu.todo" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/applications/survey">
                    <i className="simple-icon-calculator" />{" "}
                    <IntlMessages id="menu.survey" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/applications/chat">
                    <i className="simple-icon-bubbles" />{" "}
                    <IntlMessages id="menu.chat" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "ui" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "ui")
                })}
                data-parent="ui"
              >
                <NavItem>
                  <NavLink to="/app/ui/alerts">
                    <i className="simple-icon-bell" />{" "}
                    <IntlMessages id="menu.alerts" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/badges">
                    <i className="simple-icon-badge" />{" "}
                    <IntlMessages id="menu.badges" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/buttons">
                    <i className="simple-icon-control-play" />{" "}
                    <IntlMessages id="menu.buttons" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/cards">
                    <i className="simple-icon-layers" />{" "}
                    <IntlMessages id="menu.cards" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/carousel">
                    <i className="simple-icon-picture" />{" "}
                    <IntlMessages id="menu.carousel" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/charts">
                    <i className="simple-icon-chart" />{" "}
                    <IntlMessages id="menu.charts" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/collapse">
                    <i className="simple-icon-arrow-up" />{" "}
                    <IntlMessages id="menu.collapse" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/dropdowns">
                    <i className="simple-icon-arrow-down" />{" "}
                    <IntlMessages id="menu.dropdowns" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/editors">
                    <i className="simple-icon-book-open" />{" "}
                    <IntlMessages id="menu.editors" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/forms">
                    <i className="simple-icon-check" />{" "}
                    <IntlMessages id="menu.forms" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/form-components">
                    <i className="simple-icon-puzzle" />{" "}
                    <IntlMessages id="menu.form-components" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/icons">
                    <i className="simple-icon-star" />{" "}
                    <IntlMessages id="menu.icons" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/input-groups">
                    <i className="simple-icon-note" />{" "}
                    <IntlMessages id="menu.input-groups" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/jumbotron">
                    <i className="simple-icon-screen-desktop" />{" "}
                    <IntlMessages id="menu.jumbotron" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/maps">
                    <i className="simple-icon-map" />{" "}
                    <IntlMessages id="menu.maps" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/modal">
                    <i className="simple-icon-docs" />{" "}
                    <IntlMessages id="menu.modal" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/navigation">
                    <i className="simple-icon-cursor" />{" "}
                    <IntlMessages id="menu.navigation" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/popover-tooltip">
                    <i className="simple-icon-pin" />{" "}
                    <IntlMessages id="menu.popover-tooltip" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/sortable">
                    <i className="simple-icon-shuffle" />{" "}
                    <IntlMessages id="menu.sortable" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/ui/tables">
                    <i className="simple-icon-grid" />{" "}
                    <IntlMessages id="menu.tables" />
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav
                className={classnames({
                  "d-block": ((this.state.selectedParentMenu == "menu" && this.state.viewingParentMenu == "") || this.state.viewingParentMenu == "menu")
                })}
                data-parent="menu"
              >
                <NavItem>
                  <NavLink
                    to="#"
                    onClick={e => this.changeDefaultMenuType(e, "menu-default")}
                  >
                    <i className="simple-icon-control-pause" />{" "}
                    <IntlMessages id="menu.default" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    onClick={e =>
                      this.changeDefaultMenuType(e, "menu-sub-hidden")
                    }
                  >
                    <i className="simple-icon-arrow-left" />{" "}
                    <IntlMessages id="menu.subhidden" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    onClick={e => this.changeDefaultMenuType(e, "menu-hidden")}
                  >
                    <i className="simple-icon-control-start" />{" "}
                    <IntlMessages id="menu.hidden" />
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { setContainerClassnames, addContainerClassname, changeDefaultClassnames }
  )(Sidebar)
);
