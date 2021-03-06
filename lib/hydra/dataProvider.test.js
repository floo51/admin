"use strict";

var _dataProvider = _interopRequireWildcard(require("./dataProvider"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const EMBEDDED_ITEM = {
  '@id': '/books/2',
  id: 2,
  '@type': 'http://schema.org/Book',
  isbn: '9792828761393',
  name: '000',
  description: 'string',
  author: 'string',
  dateCreated: '2017-04-25T00:00:00+00:00'
};
const EMBEDDED_COMMENT = {
  '@id': '/comments/1',
  '@type': 'http://schema.org/Comment',
  text: 'Lorem ipsum dolor sit amet.',
  dateCreated: '2017-04-26T00:00:00+00:00'
};
const JSON_LD_DOCUMENT = {
  '@id': '/reviews/327',
  id: 327,
  '@type': 'http://schema.org/Review',
  reviewBody: 'Accusantium quia ipsam omnis praesentium. Neque quidem omnis perspiciatis sed. Officiis quo dolor esse nisi molestias.',
  rating: 3,
  itemReviewed: EMBEDDED_ITEM,
  comment: [EMBEDDED_COMMENT, {
    '@id': '/comments/2',
    '@type': 'http://schema.org/Comment',
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    dateCreated: '2017-04-27T00:00:00+00:00'
  }],
  aNestedObject: {
    foo: 'bar'
  }
};
describe('Transform a JSON-LD document to a React Admin compatible document', () => {
  const reactAdminDocument = (0, _dataProvider.transformJsonLdDocumentToReactAdminDocument)(JSON_LD_DOCUMENT, true, true, true);
  test('deep clone the original object', () => {
    expect(reactAdminDocument).not.toBe(JSON_LD_DOCUMENT);
    expect(reactAdminDocument.aNestedObject).not.toBe(JSON_LD_DOCUMENT.aNestedObject);
  });
  test('add an id property equal to the original @id property', () => {
    expect(reactAdminDocument.id).toBe(JSON_LD_DOCUMENT['@id']);
  });
  test('preserve the previous id property value in a new originId property', () => {
    expect(reactAdminDocument.originId).toBe(JSON_LD_DOCUMENT.id);
  });
  test('an React Admin has a custom toString method', () => {
    expect(reactAdminDocument.toString()).toBe('[object /reviews/327]');
  });
  test('keep embedded documents', () => {
    expect(JSON.stringify(reactAdminDocument.itemReviewed)).toBe(JSON.stringify(EMBEDDED_ITEM));
  });
  test('keep arrays of embedded documents', () => {
    expect(JSON.stringify(reactAdminDocument.comment[0])).toBe(JSON.stringify(EMBEDDED_COMMENT));
  });
});
describe('Transform a JSON-LD document to a React Admin compatible document (transform embeddeds)', () => {
  const reactAdminDocument = (0, _dataProvider.transformJsonLdDocumentToReactAdminDocument)(JSON_LD_DOCUMENT);
  test('transform embedded documents to their IRIs', () => {
    expect(reactAdminDocument.itemReviewed).toBe('/books/2');
  });
  test('transform arrays of embedded documents to their IRIs', () => {
    expect(reactAdminDocument.comment[0]).toBe('/comments/1');
  });
});
describe('Transform a React Admin request to an Hydra request', () => {
  const mockFetchHydra = jest.fn();
  mockFetchHydra.mockReturnValue({
    json: {
      'hydra:member': [],
      'hydra:totalItems': 3
    }
  });
  const dataProvider = (0, _dataProvider.default)('entrypoint', mockFetchHydra);
  test('React Admin get list with filter parameters', () => {
    return dataProvider.getList('resource', {
      pagination: {},
      sort: {},
      filter: {
        simple: 'foo',
        nested: {
          param: 'bar'
        },
        sub_nested: {
          sub: {
            param: true
          }
        },
        array: ['/iri/1', '/iri/2'],
        nested_array: {
          nested: ['/nested_iri/1', '/nested_iri/2']
        },
        exists: {
          foo: true
        },
        nested_date: {
          date: {
            before: '2000'
          }
        },
        nested_range: {
          range: {
            between: '12.99..15.99'
          }
        }
      }
    }).then(() => {
      const searchParams = Array.from(mockFetchHydra.mock.calls[0][0].searchParams.entries());
      expect(searchParams[0]).toEqual(['simple', 'foo']);
      expect(searchParams[1]).toEqual(['nested.param', 'bar']);
      expect(searchParams[2]).toEqual(['sub_nested.sub.param', 'true']);
      expect(searchParams[3]).toEqual(['array[0]', '/iri/1']);
      expect(searchParams[4]).toEqual(['array[1]', '/iri/2']);
      expect(searchParams[5]).toEqual(['nested_array.nested[0]', '/nested_iri/1']);
      expect(searchParams[6]).toEqual(['nested_array.nested[1]', '/nested_iri/2']);
      expect(searchParams[7]).toEqual(['exists[foo]', 'true']);
      expect(searchParams[8]).toEqual(['nested_date.date[before]', '2000']);
      expect(searchParams[9]).toEqual(['nested_range.range[between]', '12.99..15.99']);
    });
  });
});