"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_FIELDS_DATA = void 0;

var _apiDocParser = require("@api-platform/api-doc-parser");

const API_FIELDS_DATA = [new _apiDocParser.Field('fieldA', {
  id: 'http://schema.org/fieldA',
  range: 'http://www.w3.org/2001/XMLSchema#string',
  reference: null,
  required: true
}), new _apiDocParser.Field('fieldB', {
  id: 'http://schema.org/fieldB',
  range: 'http://www.w3.org/2001/XMLSchema#string',
  reference: null,
  required: true
}), new _apiDocParser.Field('deprecatedField', {
  id: 'http://localhost/deprecatedField',
  range: 'http://www.w3.org/2001/XMLSchema#string',
  reference: null,
  required: true,
  deprecated: true
})];
exports.API_FIELDS_DATA = API_FIELDS_DATA;