"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedCreateGuesser = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _InputGuesser = _interopRequireDefault(require("./InputGuesser"));

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const displayOverrideCode = (schema, fields) => {
  if (process.env.NODE_ENV === 'production') return;
  let code = 'If you want to override at least one input, paste this content in the <CreateGuesser> component of your resource:\n\n';
  code += `const ${schema.title}Create = props => (\n`;
  code += `    <CreateGuesser {...props}>\n`;
  fields.forEach(field => {
    code += `        <InputGuesser source={"${field.name}"} />\n`;
  });
  code += `    </CreateGuesser>\n`;
  code += `);\n`;
  code += `\n`;
  code += `And don't forget update your <ResourceGuesser> component:\n`;
  code += `<ResourceGuesser name={"${schema.name}"} create={${schema.title}Create} />`;
  console.info(code);
};

const IntrospectedCreateGuesser = ({
  fields,
  readableFields,
  writableFields,
  schema,
  schemaAnalyzer,
  children,
  ...props
}) => {
  let inputChildren = children;

  if (!inputChildren) {
    inputChildren = writableFields.map(field => /*#__PURE__*/_react.default.createElement(_InputGuesser.default, {
      key: field.name,
      source: field.name
    }));
    displayOverrideCode(schema, writableFields);
  }

  return /*#__PURE__*/_react.default.createElement(_reactAdmin.Create, props, /*#__PURE__*/_react.default.createElement(_reactAdmin.SimpleForm, null, inputChildren));
};

exports.IntrospectedCreateGuesser = IntrospectedCreateGuesser;

const CreateGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedCreateGuesser
}, props));

CreateGuesser.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  resource: _propTypes.default.string.isRequired
};
var _default = CreateGuesser;
exports.default = _default;