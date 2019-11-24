export default [
  [
    /^error is thrown with message (.*)$/,
    (message, state) => {
      expect(state.error).toBeDefined();
      expect(state.error.message !== message ? JSON.stringify(state.error, undefined, 4) + "\n" + state.error.stack : undefined).toBeUndefined();
    }
  ],
  [
    'no error is thrown',
    state => {
      expect(state.error && (JSON.stringify(state.error, undefined, 4) + "\n" + state.error.stack)).toBeUndefined();
    }
  ]
];