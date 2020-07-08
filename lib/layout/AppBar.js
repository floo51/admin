"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAdmin = require("react-admin");

var _core = require("@material-ui/core");

var _Logo = _interopRequireDefault(require("./Logo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const styles = {
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  spacer: {
    flex: 1
  }
};
const CustomAppBar = (0, _core.withStyles)(styles)(({
  classes,
  ...props
}) => /*#__PURE__*/_react.default.createElement(_reactAdmin.AppBar, props, /*#__PURE__*/_react.default.createElement(_core.Typography, {
  variant: "h6",
  color: "inherit",
  className: classes.title,
  id: "react-admin-title"
}), /*#__PURE__*/_react.default.createElement(_Logo.default, null), /*#__PURE__*/_react.default.createElement("span", {
  className: classes.spacer
})));
var _default = CustomAppBar;
exports.default = _default;