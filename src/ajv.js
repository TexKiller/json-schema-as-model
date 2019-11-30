import Ajv from 'ajv';

const ajv = Ajv({
  extendRefs: true
});

const wrap = ({
  fun,
  args,
  ret
}) => {
  args = args || fun.args;
  ret = ret || fun.ret;
  fun = fun.fun || fun;
  const wrapper = function () {
    if (!args || args([...arguments])) {
      const result = fun(...arguments);
      if (!ret || ret(result)) {
        return result;
      } else {
        const error = new Error("Invalid function return value");
        error.reason = ret.errors;
        throw error;
      }
    } else {
      const error = new Error("Invalid function arguments");
      error.reason = args.errors;
      throw error;
    }
  };
  wrapper.args = args;
  wrapper.ret = ret;
  wrapper.fun = fun;
  return wrapper;
};

ajv.addKeyword("arguments", {
  modifying: true,
  compile: schema => {
    const schemaType = Object.prototype.toString.call(schema);
    if (schemaType === "undefined") {
      return () => true;
    }
    let args;
    try {
      if (schemaType === "[object Array]") {
        args = ajv.compile({
          items: schema
        });
      } else {
        if (schemaType === "[object Object]" &&
          (schema.type === "array" || !schema.type && schema.items)) {
          args = ajv.compile(schema);
        } else {console.log(schema);
          throw new Error("Schema is not an array schema");
        }
      }
    } catch (e) {
      e.reason = e.message;
      e.message = "Invalid function arguments schema";
      throw e;
    }
    return (fun, key, obj) => {
      if (typeof fun !== "function") {
        throw new Error("Object with arguments must be a function");
      }
      const wrapper = wrap({
        args,
        fun: fun.jsamWrapper || fun
      });
      if (key && obj && obj[key.substr(1)]) {
        obj[key.substr(1)] = fun.prototype ? wrapper : wrapper.bind(obj);
      } else {
        fun.jsamWrapper = wrapper;
      }
      return true;
    };
  }
});

ajv.addKeyword("return", {
  modifying: true,
  compile: schema => {
    let ret;
    try {
      ret = ajv.compile(schema);
    } catch (e) {
      e.reason = e.message;
      e.message = "Invalid function return schema";
      throw e;
    }
    return (fun, key, obj) => {
      if (typeof fun !== "function") {
        throw new Error("Object with return must be a function");
      }
      const wrapper = wrap({
        ret,
        fun: fun.jsamWrapper || fun
      });
      if (key && obj && obj[key.substr(1)]) {
        obj[key.substr(1)] = fun.prototype ? wrapper : wrapper.bind(obj);
      } else {
        fun.jsamWrapper = wrapper;
      }
      return true;
    };
  }
});

export const validator = schema => ajv.compile(schema);