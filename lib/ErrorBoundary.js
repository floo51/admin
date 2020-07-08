"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAdmin = require("react-admin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ErrorBoundary extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
      errorInfo: null
    };
  }

  componentDidCatch(errorMessage, errorInfo) {
    this.setState({
      hasError: true,
      errorMessage,
      errorInfo
    });
  }

  render() {
    const {
      error,
      children
    } = this.props;
    const {
      hasError,
      errorMessage,
      errorInfo
    } = this.state;
    return hasError ? (0, _react.createElement)(error, {
      error: errorMessage,
      errorInfo
    }) : children;
  }

}

ErrorBoundary.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  error: _reactAdmin.ComponentPropType
};
var _default = ErrorBoundary;
exports.default = _default;