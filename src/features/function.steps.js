import {
  model
} from '../json-schema-model';
import SCHEMAS from './samples/schemas';
import VALUES from './samples/values';

export default [
  [
    'function is returned',
    state => {
      expect(typeof state.return).toBe("function");
    }
  ],
  [
    /^function is modeled receiving (.*), returning (.*)$/,
    (args, ret, state) => {
      try {
        state.table = state.table || [];
        state.table.push(args);
        state.table.push(ret);
        expect(SCHEMAS[args] ? undefined : "Missing arguments schema: " + args).toBeUndefined();
        expect(SCHEMAS[ret] ? undefined : "Missing return schema: " + ret).toBeUndefined();
        state.return = model({
          schema: {
            arguments: SCHEMAS[args] instanceof Array ? SCHEMAS[args] : [ SCHEMAS[args] ],
            return: SCHEMAS[ret]
          }
        });
      } catch (e) {
        state.error = e;
      }
    }
  ],
  [
    /^function is called passing (.*), returning (.*)$/,
    (values, value, state) => {
      state.table = state.table || [];
      state.table.push(values);
      state.table.push(value);
      if (typeof state.return === "function") {
        state.model = state.return;
        delete state.return;
        state.function = state.model(() => VALUES[value][0]);
        try {
          state.return = [state.function(...VALUES[values])];
        } catch (e) {
          state.error = e;
        }
      }
    }
  ],
  [
    'function is modeled without schemas',
    state => {
      try {
        state.return = model();
      } catch (e) {
        state.error = e;
      }
    }
  ]
];