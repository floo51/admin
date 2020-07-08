"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AdminResourcesGuesser = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

var _history = require("history");

var _core = require("@material-ui/core");

var _ErrorBoundary = _interopRequireDefault(require("./ErrorBoundary"));

var _ResourceGuesser = _interopRequireDefault(require("./ResourceGuesser"));

var _SchemaAnalyzerContext = _interopRequireDefault(require("./SchemaAnalyzerContext"));

var _layout = require("./layout");

var _introspectReducer = _interopRequireDefault(require("./introspectReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const displayOverrideCode = resources => {
  if (process.env.NODE_ENV === 'production') return;
  let code = 'If you want to override at least one resource, paste this content in the <AdminGuesser> component of your app:\n\n';
  resources.forEach(r => {
    code += `<ResourceGuesser name={"${r.name}"} />\n`;
  });
  console.info(code);
};
/**
 * AdminResourcesGuesser automatically renders an `<AdminUI>` component for resources exposed by a web API documented with Hydra, OpenAPI or any other format supported by `@api-platform/api-doc-parser`.
 * If child components are passed (usually `<ResourceGuesser>` or `<Resource>` components, but it can be any other React component), they are rendered in the given order.
 * If no children are passed, a `<ResourceGuesser>` component is created for each resource type exposed by the API, in the order they are specified in the API documentation.
 */


const AdminResourcesGuesser = ({
  children,
  includeDeprecated,
  resources,
  loading,
  ...rest
}) => {
  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_reactAdmin.Loading, null);
  }

  let resourceChildren = children;

  if (!resourceChildren && resources) {
    const guessResources = includeDeprecated ? resources : resources.filter(r => !r.deprecated);
    resourceChildren = guessResources.map(r => /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, {
      name: r.name,
      key: r.name
    }));
    displayOverrideCode(guessResources);
  }

  return /*#__PURE__*/_react.default.createElement(_reactAdmin.AdminUI, rest, resourceChildren);
};

exports.AdminResourcesGuesser = AdminResourcesGuesser;
const defaultHistory = (0, _history.createHashHistory)();
const defaultTheme = (0, _core.createMuiTheme)({
  palette: {
    primary: {
      contrastText: '#ffffff',
      main: '#38a9b4'
    },
    secondary: {
      main: '#288690'
    }
  }
});

const AdminGuesser = ({
  // Props for SchemaAnalyzerContext
  schemaAnalyzer,
  // Props for AdminContext
  dataProvider,
  authProvider,
  i18nProvider,
  history = defaultHistory,
  customReducers = {},
  customSagas,
  initialState,
  // Props for AdminResourcesGuesser
  includeDeprecated = false,
  // Props for AdminUI
  customRoutes = [],
  appLayout,
  layout = _layout.Layout,
  loginPage,
  locale,
  theme = defaultTheme,
  // Other props
  children,
  ...rest
}) => {
  const [resources, setResources] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [, setError] = (0, _react.useState)();
  const [addedCustomRoutes, setAddedCustomRoutes] = (0, _react.useState)([]);

  if (appLayout && process.env.NODE_ENV !== 'production') {
    console.warn('You are using deprecated prop "appLayout", it was replaced by "layout", see https://github.com/marmelab/react-admin/issues/2918');
  }

  if (loginPage === true && process.env.NODE_ENV !== 'production') {
    console.warn('You passed true to the loginPage prop. You must either pass false to disable it or a component class to customize it');
  }

  if (locale && process.env.NODE_ENV !== 'production') {
    console.warn('You are using deprecated prop "locale". You must now pass the initial locale to your i18nProvider');
  }

  (0, _react.useEffect)(() => {
    if (typeof dataProvider.introspect !== 'function') {
      throw new Error('The given dataProvider needs to expose an "introspect" function returning a parsed API documentation from api-doc-parser');
    }

    dataProvider.introspect().then(({
      data,
      customRoutes
    }) => {
      setResources(data.resources);
      setAddedCustomRoutes(customRoutes);
      setLoading(false);
    }).catch(error => {
      // Allow error to be caught by the error boundary
      setError(() => {
        throw error;
      });
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(_SchemaAnalyzerContext.default.Provider, {
    value: schemaAnalyzer
  }, /*#__PURE__*/_react.default.createElement(_reactAdmin.AdminContext, {
    authProvider: authProvider,
    dataProvider: dataProvider,
    i18nProvider: i18nProvider,
    history: history,
    customReducers: {
      introspect: _introspectReducer.default,
      ...customReducers
    },
    customSagas: customSagas,
    initialState: initialState
  }, /*#__PURE__*/_react.default.createElement(AdminResourcesGuesser, _extends({
    includeDeprecated: includeDeprecated,
    resources: resources,
    customRoutes: [...addedCustomRoutes, ...customRoutes],
    loading: loading,
    layout: appLayout || layout,
    loginPage: loginPage,
    theme: theme
  }, rest), children)));
};

AdminGuesser.propTypes = {
  dataProvider: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]).isRequired,
  schemaAnalyzer: _propTypes.default.object.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  theme: _propTypes.default.object,
  includeDeprecated: _propTypes.default.bool
};

const AdminGuesserWithError = ({
  error,
  ...props
}) => /*#__PURE__*/_react.default.createElement(_reactAdmin.TranslationProvider, {
  i18nProvider: props.i18nProvider
}, /*#__PURE__*/_react.default.createElement(_ErrorBoundary.default, {
  error: error
}, /*#__PURE__*/_react.default.createElement(AdminGuesser, props)));

AdminGuesserWithError.defaultProps = {
  error: _reactAdmin.Error,
  i18nProvider: _reactAdmin.defaultI18nProvider
};
AdminGuesserWithError.propTypes = {
  error: _reactAdmin.ComponentPropType
};
var _default = AdminGuesserWithError;
exports.default = _default;