"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _reactRedux = require("react-redux");

var _SchemaAnalyzerContext = _interopRequireDefault(require("./SchemaAnalyzerContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ResourcesIntrospecter = ({
  component: Component,
  schemaAnalyzer,
  includeDeprecated,
  resource,
  resources,
  loading,
  error,
  ...rest
}) => {
  if (loading) {
    return null;
  }

  if (error) {
    if ('production' === process.env.NODE_ENV) {
      console.error(error);
    }

    throw new Error('API schema is not readable');
  }

  if (resources == null) {
    return null;
  }

  const schema = resources.find(r => r.name === resource);

  if (!schema || !schema.fields || !schema.readableFields || !schema.writableFields) {
    if ('production' === process.env.NODE_ENV) {
      console.error(`Resource ${resource} not present inside API description`);
    }

    throw new Error(`Resource ${resource} not present inside API description`);
  }

  const fields = includeDeprecated ? schema.fields : schema.fields.filter(({
    deprecated
  }) => !deprecated);
  const readableFields = includeDeprecated ? schema.readableFields : schema.readableFields.filter(({
    deprecated
  }) => !deprecated);
  const writableFields = includeDeprecated ? schema.writableFields : schema.writableFields.filter(({
    deprecated
  }) => !deprecated);
  return /*#__PURE__*/_react.default.createElement(Component, _extends({
    schemaAnalyzer: schemaAnalyzer,
    resource: resource,
    schema: schema,
    fields: fields,
    readableFields: readableFields,
    writableFields: writableFields
  }, rest));
};

const Introspecter = ({
  component,
  includeDeprecated = false,
  resource,
  ...rest
}) => {
  const schemaAnalyzer = (0, _react.useContext)(_SchemaAnalyzerContext.default);
  const {
    resources
  } = (0, _reactRedux.useSelector)(state => state.introspect['introspect'] ? state.introspect['introspect'].data : {});
  const [loading, setLoading] = (0, _react.useState)(true);
  const [error, setError] = (0, _react.useState)(null);
  const dataProvider = (0, _reactAdmin.useDataProvider)();
  (0, _react.useEffect)(() => {
    if (resources) {
      setLoading(false);
      return;
    }

    dataProvider.introspect(resource, {}, {
      action: 'INTROSPECT'
    }).catch(error => {
      setError(error);
      setLoading(false);
    });
  }, [dataProvider, resource, resources]);
  return /*#__PURE__*/_react.default.createElement(ResourcesIntrospecter, _extends({
    component: component,
    schemaAnalyzer: schemaAnalyzer,
    includeDeprecated: includeDeprecated,
    resource: resource,
    resources: resources,
    loading: loading,
    error: error
  }, rest));
};

Introspecter.propTypes = {
  component: _propTypes.default.elementType.isRequired,
  resource: _propTypes.default.string.isRequired,
  includeDeprecated: _propTypes.default.bool
};
var _default = Introspecter;
exports.default = _default;