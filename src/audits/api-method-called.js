const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');

class ApiCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-method-called',
      title: '所有API方法调用情况',
      failureTitle: '当前页面无API方法调用',
      description: '以页面为维度了解API方法的调用情况',
      requiredArtifacts: [
        'devtoolsLogs',
      ],
    };
  }

  static audit(artifacts) {
    const { method: result } = getApiCalledMap(artifacts);
    const keys = Object.keys(result);
    const { length } = keys;
    debugger;
    return {
      score: 1,
      numericValue: length,
      displayValue: `共找到 ${length} 次API方法调用`,
      details: {
        type: 'table',
        headings: [
          {
            key: 'api',
            itemType: 'text',
            text: '名称',
          },
          {
            key: 'param',
            itemType: 'code',
            text: '入参',
          },
          {
            key: 'result',
            itemType: 'code',
            text: '返回值',
          },
          {
            key: 'count',
            itemType: 'numeric',
            text: '调用量',
          }
        ],
        items: keys.reduce((res, key) => {
          const { count } = result[key];
          res.push({
            api: key,
            param: '{}',
            result: '{}',
            count,
          });
          return res;
        }, []),
      },
    };
  }
}

module.exports = ApiCalledAudit;
