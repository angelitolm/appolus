import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'
import IntlMessages from "../../util/IntlMessages";
import { injectIntl} from 'react-intl'

const iconSupport = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon quick-tools-support"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound" x="0" y="0" width="24" height="24"/><path d="M14.8520384,9 L15.7780576,12 L8.22196243,12 L9.14797495,9 L14.8520384,9 Z M13.9260192,6 L10.0739875,6 L10.7050601,3.95551581 C10.8804029,3.38745846 11.4054966,3 12,3 C12.5945036,3 13.1195978,3.38745798 13.2949418,3.95551522 L13.9260192,6 Z M16.7040768,15 L17.9387691,19 L6.06126654,19 L7.2959499,15 L16.7040768,15 Z" id="Combined-Shape" fill="#000000"/><rect id="Rectangle" fill="#000000" opacity="0.3" x="3" y="20" width="18" height="2" rx="1"/></g></svg>'

let iconTheme = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon quick-tools-theme"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="bound1" x="0" y="0" width="24" height="24"/><path d="M16.0576695,5.11553395 L18.1789899,7.23685429 L15.7041161,11.8330484 L20.3003102,9.35817464 L22.0680772,11.1259416 C22.2633393,11.3212037 22.2633393,11.6377862 22.0680772,11.8330484 L16.7647763,17.1363492 L6.86528137,7.23685429 L12.1685822,1.93355343 C12.3638444,1.73829129 12.6804269,1.73829129 12.875689,1.93355343 L14.643456,3.70132039 L13.9363492,5.82264073 L16.0576695,5.11553395 Z" id="Combined-Shape" fill="#000000" opacity="0.3"/><path d="M10.1599151,16.1883423 L6.86835729,20.8905356 C6.23492536,21.7954322 4.98786373,22.0154978 4.08296718,21.3820658 C3.98751044,21.3152457 3.8980757,21.2402114 3.81568357,21.1578192 L2.85771147,20.1998471 C2.07666289,19.4187986 2.07666289,18.1524686 2.85771147,17.37142 C2.94393183,17.2851997 3.0378564,17.2070448 3.13831183,17.1379318 L7.86059197,13.8890191 L4.74396103,10.7723882 C4.35343673,10.3818639 4.35343673,9.74869893 4.74396103,9.35817464 L6.15817459,7.94396107 L16.0576695,17.843456 L14.643456,19.2576696 C14.2529317,19.6481939 13.6197667,19.6481939 13.2292424,19.2576696 L10.1599151,16.1883423 Z M4.74396103,19.2576696 C5.13448532,19.6481939 5.7676503,19.6481939 6.15817459,19.2576696 C6.54869888,18.8671453 6.54869888,18.2339803 6.15817459,17.843456 C5.7676503,17.4529317 5.13448532,17.4529317 4.74396103,17.843456 C4.35343673,18.2339803 4.35343673,18.8671453 4.74396103,19.2576696 Z" id="Combined-Shape" fill="#000000"/></g></svg>'

class ColorSwitcher extends Component {
	constructor(props) {
		super();

		this.toggle = this.toggle.bind(this);
		this.changeThemeColor = this.changeThemeColor.bind(this);
		this.addEvents = this.addEvents.bind(this);
		this.removeEvents = this.removeEvents.bind(this);
		this.handleDocumentClick = this.handleDocumentClick.bind(this);
		this.getContainer = this.getContainer.bind(this);

		this.state = {
			isOpen: false,
			selectedColor:localStorage.getItem('themeColor')
		};
	}

	getContainer() {
		return ReactDOM.findDOMNode(this);
	}

	toggle(e) {
		e.preventDefault();
		const isOpen = this.state.isOpen;
		if (!isOpen) {
			this.addEvents();
		} else {
			this.removeEvents();
		}
		this.setState({
			isOpen: !isOpen
		})
	}
	changeThemeColor(e, color) {
		e.preventDefault();
		localStorage.setItem('themeColor', color)
		this.toggle(e);
		setTimeout(()=>{
			window.location.reload();
		},500)
	}

	componentWillMount() {
		this.removeEvents();
	}


	addEvents() {
		['click', 'touchstart'].forEach(event =>
			document.addEventListener(event, this.handleDocumentClick, true)
		);
	}
	removeEvents() {
		['click', 'touchstart'].forEach(event =>
			document.removeEventListener(event, this.handleDocumentClick, true)
		);
	}

	handleDocumentClick(e) {
		const container = this.getContainer();
		if ((container.contains(e.target) || container === e.target)) {
			return;
		}
		this.toggle(e);
	}

	render() {
		const selectedColor = this.state.selectedColor

		const supportText = () => <IntlMessages id="dashboards.orders" />
		return (
			<Fragment>
			<div className={`theme-colors ${this.state.isOpen ? 'shown' : ''}`}>
				<div className="p-4">
					<p className="text-muted mb-2">Light Theme</p>
					<div className="d-flex flex-row justify-content-between mb-4">
						<a href="#" className={`theme-color theme-color-purple ${selectedColor==='light.purple'?'active':''}`} onClick={e => this.changeThemeColor(e, 'light.purple')}></a>
						<a href="#" className={`theme-color theme-color-blue ${selectedColor==='light.blue'?'active':''}`} onClick={e => this.changeThemeColor(e, 'light.blue')}></a>
						<a href="#" className={`theme-color theme-color-green ${selectedColor==='light.green'?'active':''}`} onClick={e => this.changeThemeColor(e, 'light.green')}></a>
						<a href="#" className={`theme-color theme-color-orange ${selectedColor==='light.orange'?'active':''}`} onClick={e => this.changeThemeColor(e, 'light.orange')}></a>
						<a href="#" className={`theme-color theme-color-red ${selectedColor==='light.red'?'active':''}`} onClick={e => this.changeThemeColor(e, 'light.red')}></a>
					</div>
					<p className="text-muted mb-2">Dark Theme</p>
					<div className="d-flex flex-row justify-content-between">
						<a href="#" className={`theme-color theme-color-purple ${selectedColor==='dark.purple'?'active':''}`} onClick={e => this.changeThemeColor(e, 'dark.purple')}></a>
						<a href="#" className={`theme-color theme-color-blue ${selectedColor==='dark.blue'?'active':''}`} onClick={e => this.changeThemeColor(e, 'dark.blue')}></a>
						<a href="#" className={`theme-color theme-color-green ${selectedColor==='dark.green'?'active':''}`} onClick={e => this.changeThemeColor(e, 'dark.green')}></a>
						<a href="#" className={`theme-color theme-color-orange ${selectedColor==='dark.orange'?'active':''}`} onClick={e => this.changeThemeColor(e, 'dark.orange')}></a>
						<a href="#" className={`theme-color theme-color-red ${selectedColor==='dark.red'?'active':''}`} onClick={e => this.changeThemeColor(e, 'dark.red')}></a>
					</div>
				</div>
				<div className="mykt-sticky-toolbar">
				  <div className="mykt-sticky-toolbar__item">
				  <a href="/" data-tip data-for='quiskToolsTheme' className="theme-button" onClick={this.toggle}><ReactTooltip id="quiskToolsTheme" place="left" effect="solid" ><IntlMessages id="quisk.tools.theme" /></ReactTooltip><div className="btn-for-theme" dangerouslySetInnerHTML={{ __html: iconTheme }} /></a>
					</div>
				</div>
			</div>


			<ul className="kt-sticky-toolbar" style={{ marginTop: '30%'}}>
				<li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--success pather-i-support" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="" data-placement="right" data-original-title="Check out more demos">
					<a href="/" data-tip data-for='quiskToolsSupport'><ReactTooltip id="quiskToolsSupport" place="left" effect="solid" ><IntlMessages id="quisk.tools.support" /></ReactTooltip><div dangerouslySetInnerHTML={{ __html: iconSupport }} /></a>
				</li>
				<li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" data-toggle="kt-tooltip" title="" data-placement="left" data-original-title="Layout Builder">
					<a href="/" data-tip data-for='quiskToolsSettings'><ReactTooltip id="quiskToolsSettings" place="left" effect="solid" ><IntlMessages id="quisk.tools.settings" /></ReactTooltip><i className="flaticon2-gear"/></a>
				</li>
				<li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--warning" data-toggle="kt-tooltip" title="" data-placement="left" data-original-title="Documentation">
					<a href="https://keenthemes.com/metronic/?page=docs" target="_blank"><i className="flaticon2-telegram-logo"/></a>
				</li>
				<li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--danger" id="kt_sticky_toolbar_chat_toggler" data-toggle="kt-tooltip" title="" data-placement="left" data-original-title="Chat Example">
					<a href="#" data-toggle="modal" data-target="#kt_chat_modal"><i className="flaticon2-chat-1"/></a>
				</li>
			</ul>
			</Fragment>
		);
	}
}

export default injectIntl(ColorSwitcher)
