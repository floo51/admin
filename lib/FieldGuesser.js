"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedFieldGuesser = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const isFieldSortable = (field, schema) => {
  return schema.parameters.filter(parameter => parameter.variable === field.name).length > 0 && schema.parameters.filter(parameter => parameter.variable === `order[${field.name}]`).length > 0;
};

const renderField = (field, schemaAnalyzer, props) => {
  if (null !== field.reference) {
    if (1 === field.maxCardinality) {
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.ReferenceField, _extends({
        reference: field.reference.name
      }, props, {
        allowEmpty: true
      }), /*#__PURE__*/_react.default.createElement(_reactAdmin.ChipField, {
        source: schemaAnalyzer.getFieldNameFromSchema(field.reference)
      }));
    }

    const fieldName = schemaAnalyzer.getFieldNameFromSchema(field.reference);
    return /*#__PURE__*/_react.default.createElement(_reactAdmin.ReferenceArrayField, _extends({
      reference: field.reference.name
    }, props), /*#__PURE__*/_react.default.createElement(_reactAdmin.SingleFieldList, null, /*#__PURE__*/_react.default.createElement(_reactAdmin.ChipField, {
      source: fieldName,
      key: fieldName
    })));
  }

  if (null !== field.embedded && 1 !== field.maxCardinality) {
    return /*#__PURE__*/_react.default.createElement(_reactAdmin.ArrayField, props, /*#__PURE__*/_react.default.createElement(_reactAdmin.SimpleList, {
      primaryText: record => JSON.stringify(record),
      linkType: false // Workaround for forcing the list to display underlying data.
      ,
      total: 2
    }));
  }

  const fieldType = schemaAnalyzer.getFieldType(field);

  switch (fieldType) {
    case 'email':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.EmailField, props);

    case 'url':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.UrlField, props);

    case 'integer':
    case 'float':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.NumberField, props);

    case 'boolean':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.BooleanField, props);

    case 'date':
    case 'dateTime':
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.DateField, props);

    default:
      return /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, props);
  }
};

const IntrospectedFieldGuesser = ({
  fields,
  readableFields,
  writableFields,
  schema,
  schemaAnalyzer,
  ...props
}) => {
  const field = fields.find(f => f.name === props.source);

  if (!field) {
    console.error(`Field "${props.source}" not present inside API description for the resource "${props.resource}"`);
    return /*#__PURE__*/_react.default.createElement(_react.Fragment, null);
  }

  return renderField(field, schemaAnalyzer, {
    sortable: isFieldSortable(field, schema),
    ...props
  });
};

exports.IntrospectedFieldGuesser = IntrospectedFieldGuesser;

const FieldGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedFieldGuesser,
  includeDeprecated: true
}, props));

FieldGuesser.propTypes = {
  source: _propTypes.default.string.isRequired
};
var _default = FieldGuesser;
exports.default = _default;