const { CONSOLE, METHOD } = require('../const');

const cach = {};

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

const apiCalledList = [
  CONSOLE.apiMethodCalled,
  CONSOLE.apiAttrCalled,
  CONSOLE.apiErrorMethodCalled,
];

/**
 * 统一获取API调用情况
 * @param {*} artifacts 
 */
const getApiCalledMap = (artifacts) => {
  if (cach.devtoolsLogs) return cach.devtoolsLogs;
  const { devtoolsLogs } = artifacts;
  valid(!type.isObj(devtoolsLogs), '缺少 devtoolsLogs');

  const { defaultPass } = devtoolsLogs;
  valid(!type.isObj(defaultPass), '缺少 defaultPass');

  try {
    const result = defaultPass.reduce((res, logItem) => {
      if (!eq(logItem.method, METHOD.webSocketFrameSent)) {
        return res;
      }

      const { method, params } = JSON.parse(logItem.params.response.payloadData);

      if (!eq(method, METHOD.consoleAPICalled)) {
        return res;
      }

      const {
        args: [logType, logApi, logParam, logResult],
        timestamp,
      } = params;

      if (!apiCalledList.includes(logType.value) || !logApi) {
        return res;
      }

      const logApiVal = logApi.value;
      let logMap;

      switch(logType.value) {
        // api-method-called
        case CONSOLE.apiMethodCalled:
          logMap = res.method;
          logMap[logApiVal] = logMap[logApiVal] || {
            count: 0,
            param: new Set(),
            result: new Set(),
            timestamp: [],
          };
          break;
        // api-attr-called
        case CONSOLE.apiAttrCalled:
          logMap = res.attr;
          logMap[logApiVal] = logMap[logApiVal] || {
            count: 0,
            timestamp: [],
          };
          break;
        // api-error-method-called
        case CONSOLE.apiErrorMethodCalled:
          logMap = res.errorMethod;
          logMap[logApiVal] = logMap[logApiVal] || {
            count: 0,
            param: new Set(),
          };
          break;
        default:
          break;
      }

      if (logMap) {
        logMap[logApiVal].count += 1;
        logMap[logApiVal].timestamp.push(timestamp);
  
        if (logParam && logParam.value) {
          logMap[logApiVal].param.add(jsonFormat(logParam.value));
        }
  
        if (logResult && logResult.value) {
          logMap[logApiVal].result.add(jsonFormat(logResult.value));
        }
      }
      return res;
    }, {
      method: {},
      errorMethod: {},
      attr: {},
    });
    cach.devtoolsLogs = result;
    return result;
  } catch (err) {
    return {};
  }
};

exports.getApiCalledMap = getApiCalledMap;