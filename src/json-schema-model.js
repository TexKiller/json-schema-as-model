import { validator } from './ajv';

export const config = {};

const proxies = new WeakSet();

function proxify(obj, validate) {
  if (proxies.has(obj)) {
    return obj;
  }
  for (const prop in obj) {
    if (typeof obj[prop] === "object") {
      obj[prop] = proxify(obj[prop], validate);
    }
  }
  const proxy = new Proxy(obj, {
    set: (obj, prop, value) => {
      validate();
      if (typeof value === "object") {
        value = proxify(value, validate);
      }
      obj[prop] = value;
      return true;
    }
  });
  proxies.add(proxy);
  return proxy;
}

export const model = (options = {}) => {
  if (config.disabled || !options.schema) {
    return value => value;
  }
  const {
    schema
  } = options;
  let validate;
  try {
    validate = validator(schema);
  } catch (e) {
    if (!e.reason) {
      e.reason = e.message;
      e.message = "Invalid schema";
    }
    throw e;
  }
  return val => {
    const value = val;
    const valid = () => {
      if (!validate(value)) {
        const e = new Error("Invalid value");
        e.schema = schema;
        e.value = value;
        e.reason = validate.errors;
        throw e;
      }
    };
    valid();
    if (typeof value !== "undefined" && value.wrapper) {
      return value.wrapper;
    } else {
      return proxify(value, valid);
    }
  };
};

export default {
  model,
  config
};