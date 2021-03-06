"use strict";

var _react = _interopRequireDefault(require("react"));

var _ResourceGuesser = _interopRequireDefault(require("./ResourceGuesser"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ResourceGuesser />', () => {
  const renderer = new _shallow.default();
  test('renders with create', () => {
    const CustomCreate = () => {};

    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, {
      create: CustomCreate
    }));
    expect(tree).toMatchSnapshot();
  });
  test('renders without create', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, null));
    expect(tree).toMatchSnapshot();
  });
  test('renders with edit', () => {
    const CustomEdit = () => {};

    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, {
      edit: CustomEdit
    }));
    expect(tree).toMatchSnapshot();
  });
  test('renders without edit', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, null));
    expect(tree).toMatchSnapshot();
  });
  test('renders with list', () => {
    const CustomList = () => {};

    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, {
      list: CustomList
    }));
    expect(tree).toMatchSnapshot();
  });
  test('renders without list', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, null));
    expect(tree).toMatchSnapshot();
  });
  test('renders with show', () => {
    const CustomShow = () => {};

    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, {
      show: CustomShow
    }));
    expect(tree).toMatchSnapshot();
  });
  test('renders without show', () => {
    const tree = renderer.render( /*#__PURE__*/_react.default.createElement(_ResourceGuesser.default, null));
    expect(tree).toMatchSnapshot();
  });
});