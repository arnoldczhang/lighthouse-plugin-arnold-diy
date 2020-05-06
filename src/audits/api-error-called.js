const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');

class ApiErrorCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-error-called',
      title: 'API异常调用情况',
      description: `小程序运行过程中如果发生了JSAPI 调用异常，
        可能会影响小程序正常业务流程，甚至导致出现白屏等现象，
        建议根据报错信息分析报错原因，查看是否存在参数错误、无权调用等情况。`,
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
        key: 'count',
        itemType: 'numeric',
        text: '调用量',
      }
    ];
  }

  static audit(artifacts) {
    const { errorMethod: result } = getApiCalledMap(artifacts);
    const keys = Object.keys(result);
    const { length } = keys;
    return {
      score: Math.max(1 - length * 0.1, 0),
      displayValue: `共找到 ${length} 次API异常调用`,
      details: {
        type: 'table',
        headings: ApiErrorCalledAudit.getHeadings(),
        items: keys.reduce((res, key) => {
          res.push({
            api: key,
            count: result[key].count,
          });
          return res;
        }, []),
      },
    };
  }
}

module.exports = ApiErrorCalledAudit;
