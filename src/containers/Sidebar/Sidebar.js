import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Menu from '../../components/uielements/menu';
import IntlMessages from '../../components/utility/intlMessages';

import {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} from '../../redux/app/reducer';
import Logo from '../../components/utility/logo';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent(e.key);
    if (this.props.app.view === 'MobileView') {
      this.props.toggleCollapsed();
      this.props.toggleOpenDrawer();
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };

  render() {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { url, app, toggleOpenDrawer, customizedTheme } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    };
    // const submenuStyle = {
    //   backgroundColor: 'rgba(0,0,0,0.3)',
    //   color: customizedTheme.textColor
    // };
    const submenuColor = {
      color: customizedTheme.textColor
    };
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={collapsed}
        width="240"
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={collapsed} />
        <Scrollbars style={{ height: scrollheight - 70 }}>
          <Menu
            onClick={this.handleClick}
            theme="dark"
            mode={mode}
            openKeys={app.openKeys}
            selectedKeys={[app.current]}
            onOpenChange={this.onOpenChange}
            className="isoDashboardMenu"
          >

            <Menu.Item key="order">
              <Link to={`${url}/order`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-clipboard" />
                  <span className="nav-text" style={{fontSize:18}}>
                    <IntlMessages id="sidebar.order" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="order-history">
              <Link to={`${url}/order-history`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-android-alarm-clock" />
                  <span className="nav-text" style={{fontSize:18}}>
                    <IntlMessages id="sidebar.order-history" />
                  </span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to={`${url}/settings`}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <i className="ion-gear-a" />
                  <span className="nav-text" style={{fontSize:18}}>
                    <IntlMessages id="sidebar.settings" />
                  </span>
                </span>
              </Link>
            </Menu.Item>

          </Menu>
        </Scrollbars>
      </Sider>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
