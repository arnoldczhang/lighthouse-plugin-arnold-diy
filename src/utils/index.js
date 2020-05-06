const { CONSOLE, METHOD } = require('../const');

const eq = (v1, v2) => v1 === v2;

const jsonFormat = (
  input = '',
  space = 4,
) => {
  try {
    return JSON.stringify(JSON.parse(input), null, space);
  } catch (err) {
    return input;
  }
};

const type = {
  isObj(input) {
    return input && eq(typeof input, 'object');
  },
};

const valid = (invalid, msg) =>  {
  if (invalid) {
    throw new Error(msg);
  }
}

const getApiCalledMap = (artifacts) => {
  const { devtoolsLogs } = artifacts;
  valid(!type.isObj(devtoolsLogs), '缺少 devtoolsLogs');

  const { defaultPass } = devtoolsLogs;
  valid(!type.isObj(defaultPass), '缺少 defaultPass');

  const apiCalledList = [CONSOLE.apiMethodCalled, CONSOLE.apiAttrCalled];

  try {
    return defaultPass.reduce((res, logItem) => {
      if (!eq(logItem.method, METHOD.webSocketFrameSent)) {
        return res;
      }

      const { method, params } = JSON.parse(logItem.params.response.payloadData);

      if (!eq(method, METHOD.consoleAPICalled)) {
        return res;
      }

      const {
        args: [logType, logApi, logParam, logResult],
      } = params;

      if (!apiCalledList.includes(logType.value) || !logApi) {
        return res;
      }

      const logApiVal = logApi.value;
      let collection;

      // api-method-called
      if (logType.value === CONSOLE.apiMethodCalled) {
        collection = res.method;
        collection[logApiVal] = collection[logApiVal] || { count: 0, param: new Set(), result: new Set() };
        collection[logApiVal].count += 1;
  
        if (logParam && logParam.value) {
          collection[logApiVal].param.add(jsonFormat(logParam.value));
        }

        if (logResult && logResult.value) {
          collection[logApiVal].result.add(jsonFormat(logResult.value));
        }

      // api-attr-called
      } else {
        collection = res.attr;
        collection[logApiVal] = collection[logApiVal] || 0;
        collection[logApiVal] += 1;
      }
      return res;
    }, {
      method: {},
      attr: {},
    });
  } catch (err) {
    return {};
  }
};

exports.getApiCalledMap = getApiCalledMap;