"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAdmin = require("react-admin");

var _core = require("@material-ui/core");

var _ChevronLeft = _interopRequireDefault(require("@material-ui/icons/ChevronLeft"));

var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useStyles = (0, _core.makeStyles)({
  spacer: {
    flex: '1 1 100%'
  }
});

var _default = props => {
  const {
    page,
    total,
    setPage,
    ...rest
  } = props;

  if (total >= 0) {
    return /*#__PURE__*/_react.default.createElement(_reactAdmin.Pagination, _extends({
      page: page,
      total: total,
      setPage: setPage
    }, rest));
  }

  const classes = useStyles(props);
  const theme = (0, _core.useTheme)();
  const translate = (0, _reactAdmin.useTranslate)();
  return /*#__PURE__*/_react.default.createElement(_core.Toolbar, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.spacer
  }), page > 1 && /*#__PURE__*/_react.default.createElement(_core.Button, {
    color: "primary",
    key: "prev",
    onClick: () => setPage(page - 1)
  }, theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_ChevronRight.default, null) : /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, null), translate('ra.navigation.prev')), total < -1 && /*#__PURE__*/_react.default.createElement(_core.Button, {
    color: "primary",
    key: "next",
    onClick: () => setPage(page + 1)
  }, translate('ra.navigation.next'), theme.direction === 'rtl' ? /*#__PURE__*/_react.default.createElement(_ChevronLeft.default, null) : /*#__PURE__*/_react.default.createElement(_ChevronRight.default, null)));
};

exports.default = _default;