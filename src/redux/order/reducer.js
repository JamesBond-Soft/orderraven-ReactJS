import actions from './actions';
import clone from 'clone';

const initState = {
  contentChanged: 0,

  dataByVendor: [],
  locationNames: [],

  dataByLocation: [],
  vendorNames: [],
  vendorUuids: [],
  vendorMemos: {},

  allCollapsed: true,
  collapseCommand: '',  // '' or 'ExpandAll' or 'CollapseAll'
};

export default function(state = initState, action) {
  switch (action.type) {
    case actions.SET_CONTENT_CHANGED:
      let value = state.contentChanged + 1
      if (value > 9999) value = 0
      return {
        ...state,
        contentChanged: value,
      }
    case actions.SET_VENDOR_MEMO:
      const { vendorMemos } = state;
      vendorMemos[action.vendorUuid] = action.memo;
      return {
        ...state,
        vendorMemos: clone(vendorMemos),
      }
    case actions.SET_DATA_BY_VENDOR:
      return {
        ...state,
        dataByVendor: action.dataByVendor,
      }
    case actions.SET_LOCATION_NAMES:
      return {
        ...state,
        locationNames: action.locationNames,
      }
    case actions.SET_DATA_BY_LOCATION:
      return {
        ...state,
        dataByLocation: action.dataByLocation,
      }
    case actions.SET_VENDOR_NAMES_UUIDS:
      return {
        ...state,
        vendorNames: action.vendorNames,
        vendorUuids: action.vendorUuids,
      }
    case actions.SET_COLLAPSE_STATUS:
      return {
        ...state,
        allCollapsed: action.status,
      }
    case actions.SET_COLLAPSE_COMMAND:
      return {
        ...state,
        collapseCommand: action.command,
      }
    default:
      return state;
  }
}
