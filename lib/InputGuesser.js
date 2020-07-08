"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedInputGuesser = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const IntrospectedInputGuesser = ({
  fields,
  readableFields,
  writableFields,
  schema,
  schemaAnalyzer,
  ...props
}) => {
  const field = fields.find(({
    name
  }) => name === props.source);

  if (!field) {
    console.error(`Field ${props.source} not present inside API description for the resource ${props.resource}`);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null);
  }

  const validate = !props.validate && field.required ? [(0, _reactAdmin.required)()] : props.validate;

  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.ReferenceInput, _extends({
        key: field.name,
        label: field.name,
        reference: field.reference.name,
        source: field.name,
        validate: validate
      }, props, {
        allowEmpty: true
      }), /*#__PURE__*/_react.default.createElement(_reactAdmin.SelectInput, {
        optionText: schemaAnalyzer.getFieldNameFromSchema(field.reference)
      }));
    }

    return /*#__PURE__*/_react.default.createElement(_reactAdmin.ReferenceArrayInput, _extends({
      key: field.name,
      label: field.name,
      reference: field.reference.name,
      source: field.name,
      validate: validate
    }, props, {
      allowEmpty: true
    }), /*#__PURE__*/_react.default.createElement(_reactAdmin.SelectArrayInput, {
      optionText: schemaAnalyzer.getFieldNameFromSchema(field.reference)
    }));
  }

  const fieldType = schemaAnalyzer.getFieldType(field);

  if (fieldType === 'id') {
    const prefix = `/${props.resource}/`;

    props.format = value => {
      return value && 0 === value.indexOf(prefix) ? value.substr(prefix.length) : value;
    };

    props.parse = value => {
      return -1 !== value.indexOf(prefix) ? prefix + value : value;
    };
  }

  const formatEmbedded = value => JSON.stringify(value);

  const parseEmbedded = value => JSON.parse(value);

  if (null !== field.embedded && 1 === field.maxCardinality) {
    props.format = formatEmbedded;
    props.parse = parseEmbedded;
  }

  switch (fieldType) {
    case 'array':
      let textInputFormat = value => value;

      let textInputParse = value => value;

      if (null !== field.embedded && 1 !== field.maxCardinality) {
        textInputFormat = formatEmbedded;
        textInputParse = parseEmbedded;
      }

      return /*#__PURE__*/_react.default.createElement(_reactAdmin.ArrayInput, _extends({
        key: field.name,
        source: field.name,
        validate: validate
      }, props), /*#__PURE__*/_react.default.createElement(_reactAdmin.SimpleFormIterator, null, /*#__PURE__*/_react.default.createElement(_reactAdmin.TextInput, {
        format: textInputFormat,
        parse: textInputParse
      })));

    case 'integer':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.NumberInput, _extends({
        key: field.name,
        source: field.name,
        validate: validate
      }, props));

    case 'float':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.NumberInput, _extends({
        key: field.name,
        source: field.name,
        step: "0.1",
        validate: validate
      }, props));

    case 'boolean':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.BooleanInput, _extends({
        key: field.name,
        source: field.name,
        validate: validate
      }, props));

    case 'date':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.DateInput, _extends({
        key: field.name,
        source: field.name,
        validate: validate
      }, props));

    case 'dateTime':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.DateTimeInput, _extends({
        key: field.name,
        source: field.name,
        validate: validate
      }, props));

    default:
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.TextInput, _extends({
        key: field.name,
        source: field.name,
        validate: validate
      }, props));
  }
};

exports.IntrospectedInputGuesser = IntrospectedInputGuesser;

const InputGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedInputGuesser,
  includeDeprecated: true
}, props));

InputGuesser.propTypes = {
  source: _propTypes.default.string.isRequired
};
var _default = InputGuesser;
exports.default = _default;