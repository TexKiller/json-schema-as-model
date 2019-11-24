import {
  model
} from '../json-schema-model';
import SCHEMAS from './samples/schemas';
import VALUES from './samples/values';

export default [
  [
    'object is modeled without schema',
    state => {
      try {
        state.return = model();
      } catch (e) {
        state.error = e;
      }
    }
  ],
  [
    'object is returned',
    state => {
      expect(state.return).toBe(state.object);
    }
  ],
  [
    /^object is modeled as (.*)$/,
    (schema, state) => {
      try {
        state.return = model({
          schema: SCHEMAS[schema]
        });
      } catch (e) {
        state.error = e;
      }
    }
  ],
  [
    /^object is initialized with (.*)$/,
    (value, state) => {
      if (typeof state.return === "function") {
        state.model = state.return;
        delete state.return;
        state.object = VALUES[value][0];
        try {
          state.return = state.model(...VALUES[value]);
        } catch (e) {
          state.error = e;
        }
      }
    }
  ],
  [
    'proxy is returned',
    state => () => {
      expect(state.return).not.toBe(state.object);
    }
  ]
];