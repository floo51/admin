"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedFilterGuesser = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactAdmin = require("react-admin");

var _InputGuesser = _interopRequireDefault(require("./InputGuesser"));

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const IntrospectedFilterGuesser = ({
  fields,
  readableFields,
  writableFields,
  schema,
  schemaAnalyzer,
  hasShow,
  hasEdit,
  ...rest
}) => {
  const [filtersParameters, setFiltersParameters] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    if (schema) {
      schemaAnalyzer.getFiltersParametersFromSchema(schema).then(parameters => setFiltersParameters(parameters));
    }
  }, []);

  if (!filtersParameters.length) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_reactAdmin.Filter, rest, filtersParameters.map(filter => /*#__PURE__*/_react.default.createElement(_InputGuesser.default, {
    key: filter.name,
    source: filter.name,
    alwaysOn: filter.isRequired
  })));
};

exports.IntrospectedFilterGuesser = IntrospectedFilterGuesser;

const FilterGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedFilterGuesser
}, props));

var _default = FilterGuesser;
exports.default = _default;