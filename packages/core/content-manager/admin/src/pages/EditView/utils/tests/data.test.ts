import { testData } from '../../../../tests/data';
import { removeProhibitedFields } from '../data';

const defaultFieldsValues = {
  name: 'name',
  password: '',
};

describe('data', () => {
  describe('removeProhibitedFields', () => {
    it('should return an empty object', () => {
      const { components, contentType } = testData;

      expect(removeProhibitedFields(['password'])(contentType, components)({})).toEqual({});
    });

    it('should return the initial data if there is no password field', () => {
      const { components, contentType } = testData;

      expect(
        removeProhibitedFields(['password'])(contentType, components)({ name: 'name' })
      ).toEqual({
        name: 'name',
      });
    });

    it('should remove the password field for a simple data structure', () => {
      const { components, contentType } = testData;

      expect(
        removeProhibitedFields(['password'])(contentType, components)({
          name: 'name',
          password: 'password',
        })
      ).toEqual(defaultFieldsValues);
    });

    it('should remove all password fields', () => {
      const { components, contentType, modifiedData } = testData;

      const result = removeProhibitedFields(['password'])(contentType, components)(modifiedData);

      expect(result).toEqual({
        createdAt: '2020-04-28T13:22:13.033Z',
        dz: [
          {
            __component: 'compos.sub-compo',
            id: 7,
            ...defaultFieldsValues,
          },
          {
            id: 4,
            documentId: '456789',
            ...defaultFieldsValues,
            subcomponotrepeatable: null,
            subrepeatable: [],
            __component: 'compos.test-compo',
          },
          {
            id: 5,
            documentId: '567890',
            ...defaultFieldsValues,
            subcomponotrepeatable: { id: 9, name: 'name', password: '' },
            subrepeatable: [{ id: 8, name: 'name', password: '' }],
            __component: 'compos.test-compo',
          },
          {
            id: 6,
            documentId: '678901',
            name: null,
            password: null,
            subcomponotrepeatable: null,
            subrepeatable: [],
            __component: 'compos.test-compo',
          },
        ],
        id: 1,
        name: 'name',
        notrepeatable: {
          id: 1,
          documentId: '123456',
          ...defaultFieldsValues,
          subcomponotrepeatable: { id: 4, name: 'name', password: '' },
          subrepeatable: [
            { id: 1, name: 'name', password: '' },
            { id: 2, name: 'name', password: '' },
            { id: 3, name: 'name', password: '' },
          ],
        },
        password: '',
        repeatable: [
          {
            id: 2,
            documentId: '234567',
            ...defaultFieldsValues,
            subrepeatable: [{ id: 5, name: 'name', password: '' }],
            subcomponotrepeatable: { id: 6, name: 'name', password: '' },
          },
          {
            id: 3,
            documentId: '345678',
            ...defaultFieldsValues,
            subrepeatable: [],
            subcomponotrepeatable: null,
          },
        ],
        updatedAt: '2020-04-28T13:22:13.033Z',
      });
    });
  });
});
