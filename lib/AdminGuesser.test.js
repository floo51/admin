"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _AdminGuesser = require("./AdminGuesser");

var _ResourceGuesser = _interopRequireDefault(require("./ResourceGuesser"));

var _resources = _interopRequireDefault(require("./__fixtures__/resources"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<AdminGuesser />', () => {
  const renderer = new _shallow.default();
  test('renders loading', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_AdminGuesser.AdminResourcesGuesser, {
      loading: true
    }));
    expect(tree).toMatchSnapshot();
  });
  test('renders without custom resources', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_AdminGuesser.AdminResourcesGuesser, {
      resources: _resources.default,
      loading: false
    }));
    expect(tree).toMatchSnapshot();
  });
  test('renders with custom resources', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_AdminGuesser.AdminResourcesGuesser, {
      resources: _resources.default,
      loading: false
    }, /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, {
      name: "custom"
    })));
    expect(tree).toMatchSnapshot();
  });
  test('renders without data', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_AdminGuesser.AdminResourcesGuesser, {
      loading: false
    }));
    expect(tree).toMatchSnapshot();
  });
});