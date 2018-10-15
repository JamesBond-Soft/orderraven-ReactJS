import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../../redux/themeSwitcher/actions.js';
import Switcher from '../../components/themeSwitcher/themeSwitcher';
import LanguageSwitcher from '../LanguageSwitcher';
import Themes from './config';
import bucketSVG from '../../image/bucket.svg';
import IntlMessages from '../../components/utility/intlMessages';

const { switchActivation, changeTheme } = Actions;

class ThemeSwitcher extends Component {
  render() {
    const {
      isActivated,
      topbarTheme,
      sidebarTheme,
      layoutTheme,
      switchActivation,
      changeTheme,
    } = this.props;

    const styleButton = { background: sidebarTheme.buttonColor };

    return (
      <div
        className={isActivated ? 'isoThemeSwitcher active' : 'isoThemeSwitcher'}
      >
        <div className="componentTitleWrapper" style={styleButton}>
          <h3 className="componentTitle">
            <IntlMessages id="themeSwitcher.settings" />
          </h3>
        </div>

        <div className="SwitcherBlockWrapper">
          <Switcher
            config={Themes.sidebarTheme}
            changeTheme={changeTheme}
            selectedId={sidebarTheme.themeName}
          />

          <Switcher
            config={Themes.topbarTheme}
            changeTheme={changeTheme}
            selectedId={topbarTheme.themeName}
          />

          <Switcher
            config={Themes.layoutTheme}
            changeTheme={changeTheme}
            selectedId={layoutTheme.themeName}
          />
          <LanguageSwitcher />
        </div>

        <button
          type="primary"
          className="switcherToggleBtn"
          style={styleButton}
          onClick={() => {
            switchActivation();
          }}
        >
          <img src={process.env.PUBLIC_URL + bucketSVG} alt="bucket" />
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.ThemeSwitcher.toJS(),
    LanguageSwitcher: state.LanguageSwitcher.toJS(),
  };
}
export default connect(mapStateToProps, {
  switchActivation,
  changeTheme,
})(ThemeSwitcher);
