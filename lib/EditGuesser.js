"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IntrospectedEditGuesser = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _InputGuesser = _interopRequireDefault(require("./InputGuesser"));

var _Introspecter = _interopRequireDefault(require("./Introspecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const displayOverrideCode = (schema, fields) => {
  if (process.env.NODE_ENV === 'production') return;
  let code = 'If you want to override at least one input, paste this content in the <EditGuesser> component of your resource:\n\n';
  code += `const ${schema.title}Edit = props => (\n`;
  code += `    <EditGuesser {...props}>\n`;
  fields.forEach(field => {
    code += `        <InputGuesser source={"${field.name}"} />\n`;
  });
  code += `    </EditGuesser>\n`;
  code += `);\n`;
  code += `\n`;
  code += `And don't forget update your <ResourceGuesser> component:\n`;
  code += `<ResourceGuesser name={"${schema.name}"} edit={${schema.title}Edit} />`;
  console.info(code);
};

const IntrospectedEditGuesser = ({
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

  return /*#__PURE__*/_react.default.createElement(_reactAdmin.Edit, props, /*#__PURE__*/_react.default.createElement(_reactAdmin.SimpleForm, null, inputChildren));
};

exports.IntrospectedEditGuesser = IntrospectedEditGuesser;

const EditGuesser = props => /*#__PURE__*/_react.default.createElement(_Introspecter.default, _extends({
  component: IntrospectedEditGuesser
}, props));

EditGuesser.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  resource: _propTypes.default.string.isRequired
};
var _default = EditGuesser;
exports.default = _default;