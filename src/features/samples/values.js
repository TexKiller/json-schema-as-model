export default {
  "object with two properties": [{
    prop1: "value",
    prop2: "value"
  }],
  "object without required property": [{
    prop2: "value"
  }],
  "object": [{
    prop1: "value"
  }],
  "string": ["string"],
  "string and string": [
    "string",
    "string"
  ],
  "string and number": [
    "string",
    2
  ],
  "number": [2],
  "object with method": [{
    method(string, number) {
      return string + number;
    }
  }],
  "object with wrong method": [{
    wrongMethod(string, number) {
      return string + number;
    }
  }],
  "object with method returning number": [{
    method() {
      return 2;
    }
  }],
  "object with method returning object": [{
    method() {
      return {};
    }
  }],
  "object with method returning undefined": [{
    method() {
      return undefined;
    }
  }],
};