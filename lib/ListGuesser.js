"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedListGuesser = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _FieldGuesser = _interopRequireDefault(require("./FieldGuesser"));

var _FilterGuesser = _interopRequireDefault(require("./FilterGuesser"));

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

var _Pagination = _interopRequireDefault(require("./list/Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const displayOverrideCode = (schema, fields) => {
  if (process.env.NODE_ENV === 'production') return;
  let code = 'If you want to override at least one field, paste this content in the <ListGuesser> component of your resource:\n\n';
  code += `const ${schema.title}List = props => (\n`;
  code += `    <ListGuesser {...props}>\n`;
  fields.forEach(field => {
    code += `        <FieldGuesser source={"${field.name}"} />\n`;
  });
  code += `    </ListGuesser>\n`;
  code += `);\n`;
  code += `\n`;
  code += `And don't forget update your <ResourceGuesser> component:\n`;
  code += `<ResourceGuesser name={"${schema.name}"} list={${schema.title}List} />`;
  console.info(code);
};

const IntrospectedListGuesser = ({
  fields,
  readableFields,
  writableFields,
  schema,
  schemaAnalyzer,
  children,
  ...props
}) => {
  const [orderParameters, setOrderParameters] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    if (schema) {
      schemaAnalyzer.getOrderParametersFromSchema(schema).then(parameters => setOrderParameters(parameters));
    }
  }, []);
  let fieldChildren = children;

  if (!fieldChildren) {
    fieldChildren = readableFields.map(field => /*#__PURE__*/_react.default.createElement(_FieldGuesser.default, {
      key: field.name,
      source: field.name,
      sortable: orderParameters.includes(field.name),
      resource: props.resource
    }));
    displayOverrideCode(schema, readableFields);
  }

  return /*#__PURE__*/_react.default.createElement(_reactAdmin.List, _extends({
    pagination: /*#__PURE__*/_react.default.createElement(_Pagination.default, null)
  }, props), /*#__PURE__*/_react.default.createElement(_reactAdmin.Datagrid, null, fieldChildren, props.hasShow && /*#__PURE__*/_react.default.createElement(_reactAdmin.ShowButton, null), props.hasEdit && /*#__PURE__*/_react.default.createElement(_reactAdmin.EditButton, null)));
};

exports.IntrospectedListGuesser = IntrospectedListGuesser;

const ListGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedListGuesser
}, props));

ListGuesser.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  resource: _propTypes.default.string.isRequired,
  filters: _propTypes.default.element
};
ListGuesser.defaultProps = {
  filters: /*#__PURE__*/_react.default.createElement(_FilterGuesser.default, null)
};
var _default = ListGuesser;
exports.default = _default;