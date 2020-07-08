"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (previousState = {}, {
  type,
  payload
}) => {
  if (type !== 'INTROSPECT_SUCCESS') {
    return previousState;
  }

  return {
    introspect: payload
  };
};

exports.default = _default;