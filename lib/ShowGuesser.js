"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedShowGuesser = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _FieldGuesser = _interopRequireDefault(require("./FieldGuesser"));

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const displayOverrideCode = (schema, fields) => {
  if (process.env.NODE_ENV === 'production') return;
  let code = 'If you want to override at least one field, paste this content in the <ShowGuesser> component of your resource:\n\n';
  code += `const ${schema.title}Show = props => (\n`;
  code += `    <ShowGuesser {...props}>\n`;
  fields.forEach(field => {
    code += `        <FieldGuesser source={"${field.name}"} addLabel={true} />\n`;
  });
  code += `    </ShowGuesser>\n`;
  code += `);\n`;
  code += `\n`;
  code += `And don't forget update your <ResourceGuesser> component:\n`;
  code += `<ResourceGuesser name={"${schema.name}"} show={${schema.title}Show} />`;
  console.info(code);
};

const IntrospectedShowGuesser = ({
  fields,
  readableFields,
  writableFields,
  schema,
  schemaAnalyzer,
  children,
  ...props
}) => {
  let fieldChildren = children;

  if (!fieldChildren) {
    fieldChildren = readableFields.map(field => /*#__PURE__*/_react.default.createElement(_FieldGuesser.default, {
      key: field.name,
      source: field.name,
      addLabel: true
    }));
    displayOverrideCode(schema, readableFields);
  }

  return /*#__PURE__*/_react.default.createElement(_reactAdmin.Show, props, /*#__PURE__*/_react.default.createElement(_reactAdmin.SimpleShowLayout, null, fieldChildren));
};

exports.IntrospectedShowGuesser = IntrospectedShowGuesser;

const ShowGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedShowGuesser
}, props));

ShowGuesser.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  resource: _propTypes.default.string.isRequired
};
var _default = ShowGuesser;
exports.default = _default;