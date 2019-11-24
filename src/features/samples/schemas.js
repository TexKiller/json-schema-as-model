export default {
  "invalid schema": {
    type: "no type"
  },
  "object without additional properties": {
    type: "object",
    properties: {
      prop1: {
        type: "string"
      }
    },
    additionalProperties: false
  },
  "object with required property": {
    type: "object",
    properties: {
      prop1: {
        type: "string"
      }
    },
    required: ["prop1"]
  },
  "string": {
    type: "string"
  },
  "string and number": [
    {
      type: "string"
    },
    {
      type: "number"
    }
  ],
  "object with method": {
    type: "object",
    properties: {
      method: {
        arguments: [
          {
            type: "string"
          },
          {
            type: "number"
          }
        ],
        return: {
          type: "string"
        }
      }
    },
    required: ["method"]
  }
};