"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactAdmin = require("react-admin");

var _enzyme = require("enzyme");

var _FieldGuesser = _interopRequireDefault(require("./FieldGuesser"));

var _parsedData = require("./__fixtures__/parsedData");

var _ShowGuesser = require("./ShowGuesser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<ShowGuesser />', () => {
  test('renders with no children', () => {
    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_ShowGuesser.IntrospectedShowGuesser, {
      resource: "user",
      schema: {
        name: 'users',
        title: 'User'
      },
      readableFields: _parsedData.API_FIELDS_DATA,
      id: "ShowComponentId"
    }));
    expect(wrapper).toContainReact( /*#__PURE__*/_react.default.createElement(_FieldGuesser.default, {
      source: "fieldA",
      addLabel: true
    }));
    expect(wrapper).toContainReact( /*#__PURE__*/_react.default.createElement(_FieldGuesser.default, {
      source: "fieldB",
      addLabel: true
    }));
    expect(wrapper).toContainReact( /*#__PURE__*/_react.default.createElement(_FieldGuesser.default, {
      source: "deprecatedField",
      addLabel: true
    }));
  });
  test('renders with custom fields', () => {
    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_ShowGuesser.IntrospectedShowGuesser, {
      resource: "user",
      readableFields: _parsedData.API_FIELDS_DATA,
      id: "ShowComponentId"
    }, /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, {
      source: "id",
      label: 'label of id'
    }), /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, {
      source: "title",
      label: 'label of title'
    }), /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, {
      source: "body",
      label: 'label of body'
    })));
    expect(wrapper).toContainReact( /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, {
      source: "id",
      label: 'label of id'
    }));
    expect(wrapper).toContainReact( /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, {
      source: "title",
      label: 'label of title'
    }));
    expect(wrapper).toContainReact( /*#__PURE__*/_react.default.createElement(_reactAdmin.TextField, {
      source: "body",
      label: 'label of body'
    }));
  });
});