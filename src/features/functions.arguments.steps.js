import {
  model
} from '../json-schema-model';
import SCHEMAS from './samples/schemas';
import VALUES from './samples/values';

export default [
  [
    /^function is modeled receiving (.*)$/,
    (args, state) => {
      try {
        expect(SCHEMAS[args] ? undefined : "Missing arguments schema: " + args).toBeUndefined();
        state.return = model({
          schema: {
            arguments: SCHEMAS[args] instanceof Array ? SCHEMAS[args] : [ SCHEMAS[args] ]
          }
        });
      } catch (e) {
        state.error = e;
      }
    }
  ],
  [
    /^function is called passing (.*)$/,
    (values, state) => {
      if (typeof state.return === "function") {
        state.model = state.return;
        delete state.return;
        state.function = state.model(() => {});
        try {
          state.return = [state.function(...VALUES[values])];
        } catch (e) {
          state.error = e;
        }
      }
    }
  ]
];