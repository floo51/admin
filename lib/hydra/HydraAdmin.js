"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dataProvider = _interopRequireDefault(require("./dataProvider"));

var _schemaAnalyzer = _interopRequireDefault(require("./schemaAnalyzer"));

var _AdminGuesser = _interopRequireDefault(require("../AdminGuesser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const hydraSchemaAnalyzer = (0, _schemaAnalyzer.default)();

const HydraAdmin = ({
  entrypoint,
  dataProvider = (0, _dataProvider.default)(entrypoint),
  schemaAnalyzer = hydraSchemaAnalyzer,
  ...props
}) => /*#__PURE__*/_react.default.createElement(_AdminGuesser.default, _extends({
  dataProvider: dataProvider,
  schemaAnalyzer: schemaAnalyzer
}, props));

HydraAdmin.propTypes = {
  entrypoint: _propTypes.default.string.isRequired
};
var _default = HydraAdmin;
exports.default = _default;