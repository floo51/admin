"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAdmin = require("react-admin");

var _ListGuesser = _interopRequireDefault(require("./ListGuesser"));

var _CreateGuesser = _interopRequireDefault(require("./CreateGuesser"));

var _EditGuesser = _interopRequireDefault(require("./EditGuesser"));

var _ShowGuesser = _interopRequireDefault(require("./ShowGuesser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ResourceGuesser = ({
  list,
  edit,
  create,
  show,
  ...props
}) => /*#__PURE__*/_react.default.createElement(_reactAdmin.Resource, _extends({}, props, {
  create: create || _CreateGuesser.default,
  edit: edit || _EditGuesser.default,
  list: list || _ListGuesser.default,
  show: show || _ShowGuesser.default
}));

var _default = ResourceGuesser;
exports.default = _default;