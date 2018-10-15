
const actions = {

  //
  // orders
  //

  SET_CONTENT_CHANGED: 'SET_CONTENT_CHANGED',
  setContentChanged: () => {
    return {
      type: actions.SET_CONTENT_CHANGED,
    }
  },

  SET_DATA_BY_VENDOR: 'SET_DATA_BY_VENDOR',
  setDataByVendor: (dataByVendor) => {
    return {
      type: actions.SET_DATA_BY_VENDOR,
      dataByVendor: dataByVendor
    }
  },

  SET_LOCATION_NAMES: 'SET_LOCATION_NAMES',
  setLocationNames: (locationNames) => {
    return {
      type: actions.SET_LOCATION_NAMES,
      locationNames: locationNames
    }
  },

  SET_DATA_BY_LOCATION: 'SET_DATA_BY_LOCATION',
  setDataByLocation: (dataByLocation) => {
    return {
      type: actions.SET_DATA_BY_LOCATION,
      dataByLocation: dataByLocation
    }
  },

  SET_VENDOR_NAMES_UUIDS: 'SET_VENDOR_NAMES_UUIDS',
  setVendorNamesUuids: (vendorNames, vendorUuids) => {
    return {
      type: actions.SET_VENDOR_NAMES_UUIDS,
      vendorNames,
      vendorUuids
    }
  },

  SET_VENDOR_MEMO: 'SET_VENDOR_MEMO',
  setVendorMemo: (vendorUuid, memo) => {
    return {
      type: actions.SET_VENDOR_MEMO,
      vendorUuid,
      memo
    }
  },

  SET_COLLAPSE_STATUS: 'SET_COLLAPSE_STATUS',
  setCollapseState: (status: Boolean) => {
    return {
      type: actions.SET_COLLAPSE_STATUS,
      status,
    }
  },

  SET_COLLAPSE_COMMAND: 'SET_COLLAPSE_COMMAND',
  setCollapseCommand: (command: String) => {
    return {
      type: actions.SET_COLLAPSE_COMMAND,
      command,
    }
  },
}

export default actions;