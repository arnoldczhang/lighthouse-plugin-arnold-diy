const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');

class ApiDeprecatedCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-deprecated-called',
      title: '废弃API被调用情况',
      description: `使用即将废弃或已废弃的接口，
        可能会导致小程序运行异常。一般情况下，
        废弃的接口不会立即移除，但保险起见，
        建议不要使用废弃的 API，以避免小程序后续突然运行异常。`,
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
    const { method: result } = getApiCalledMap(artifacts);
    const keys = Object.keys(result).filter(key => false);
    const { length } = keys;
    return {
      score: Math.max(1 - length * 0.1, 0),
      displayValue: `共找到 ${length} 次废弃API调用`,
      details: {
        type: 'table',
        headings: ApiDeprecatedCalledAudit.getHeadings(),
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

module.exports = ApiDeprecatedCalledAudit;
