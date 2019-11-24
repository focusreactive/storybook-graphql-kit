"use strict";

var _addonDevkit = require("@storybook/addon-devkit");

var _PanelUI = _interopRequireDefault(require("./dist/PanelUI"));

var _actions = require("./dist/lib/actions");

var _selectors = require("./dist/lib/selectors");

require("./dist/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectors = {
  searchVars: _selectors.getSearchVars,
  isConnected: function isConnected(store) {
    return store.isConnected;
  }
};

var actions = function actions(_ref) {
  var local = _ref.local;
  return {
    request: local(_actions.contentRequest),
    search: local(_actions.updateSearch),
    startRequest: local(_actions.startRequest)
  };
};

(0, _addonDevkit.register)(selectors, actions)(_PanelUI.default);
console.log('test');