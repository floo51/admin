"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactAdmin = require("react-admin");

var _apiDocParser = require("@api-platform/api-doc-parser");

var _jsonld = require("jsonld");

/**
 * Sends HTTP requests to a Hydra API.
 *
 * Adapted from react-admin
 *
 * @copyright Kévin Dunglas
 *
 * @param {string} url
 * @param {object} options
 * @return {object}
 */
var _default = (url, options = {}) => {
  const requestHeaders = options.headers || new Headers();

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  }

  return (0, _apiDocParser.fetchJsonLd)(url, { ...options,
    headers: requestHeaders
  }).then(data => {
    const status = data.response.status;

    if (status < 200 || status >= 300) {
      const body = data.body;
      delete body.trace;
      return _jsonld.promises.expand(body, {
        base: (0, _apiDocParser.getDocumentationUrlFromHeaders)(data.response.headers)
      }).then(json => {
        return Promise.reject(new _reactAdmin.HttpError(json[0]['http://www.w3.org/ns/hydra/core#description'][0]['@value'], status, json));
      }).catch(e => {
        if (e.hasOwnProperty('body')) {
          return Promise.reject(e);
        }

        return Promise.reject(new _reactAdmin.HttpError(data.response.statusText, status));
      });
    }

    return {
      status: status,
      headers: data.response.headers,
      json: data.body
    };
  });
};

exports.default = _default;