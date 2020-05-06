const CONSOLE = {
  apiMethodCalled: 'api-method-called',
  apiAttrCalled: 'api-attr-called',
  apiErrorMethodCalled: 'api-error-method-called',
};

const METHOD = {
  webSocketFrameSent: 'Network.webSocketFrameSent',
  consoleAPICalled: 'Runtime.consoleAPICalled',
};

exports.MAX_CALLED = 5;

exports.CONSOLE = CONSOLE;

exports.METHOD = METHOD;
