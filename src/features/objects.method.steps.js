import VALUES from './samples/values';

export default [
  [
    /^method is called passing (.*)$/,
    (args, state) => {
      if (state.return && typeof state.return.method === "function") {
        state.modeled = state.return;
        delete state.return;
        try {
          state.return = state.modeled.method(...VALUES[args]);
        } catch (e) {
          state.error = e;
        }
      }
    }
  ]
];