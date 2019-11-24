import {
  model
} from '../json-schema-model';
import SCHEMAS from './samples/schemas';
import VALUES from './samples/values';

export default [
  [
    /^function is modeled returning (.*)$/,
    (ret, state) => {
      try {
        expect(SCHEMAS[ret] ? undefined : ret).toBeUndefined();
        state.return = model({
          schema: {
            return: SCHEMAS[ret]
          }
        });
      } catch (e) {
        state.error = e;
      }
    }
  ],
  [
    /^function is called returning (.*)$/,
    (value, state) => {
      if (typeof state.return === "function") {
        state.model = state.return;
        delete state.return;
        state.function = state.model(() => VALUES[value][0]);
        try {
          state.return = [state.function()];
        } catch (e) {
          state.error = e;
        }
      }
    }
  ]
];