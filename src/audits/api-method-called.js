const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');

class ApiMethodCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-method-called',
      title: 'API方法调用情况',
      description: '以页面为维度了解API方法调用的情况。',
      requiredArtifacts: [
        'devtoolsLogs',
      ],
    };
  }

  static getHeadings() {
    return [
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
        text: '返回结果',
      },
      {
        key: 'count',
        itemType: 'numeric',
        text: '调用量',
      }
    ];
  }

  static audit(artifacts) {
    const { method: result } = getApiCalledMap(artifacts);
    const keys = Object.keys(result);
    const { length } = keys;
    return {
      score: 1,
      displayValue: `共找到 ${length} 次API方法调用`,
      details: {
        type: 'table',
        headings: ApiMethodCalledAudit.getHeadings(),
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

module.exports = ApiMethodCalledAudit;
