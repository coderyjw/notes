define(['react-dom', 'react'], (function (ReactDOM, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  var App = (function () {
      return React__default["default"].createElement("h1", null, "hello react");
  });

  ReactDOM__default["default"].render(React__default["default"].createElement(App, null), document.getElementById('root'));

}));
