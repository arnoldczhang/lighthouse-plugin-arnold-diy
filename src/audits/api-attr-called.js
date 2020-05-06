const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');

class ApiAttrCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-attr-called',
      title: 'API属性调用情况',
      description: '以页面为维度了解API属性调用的情况。',
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
    const { attr: result } = getApiCalledMap(artifacts);
    const keys = Object.keys(result);
    const { length } = keys;
    return {
      score: 1,
      displayValue: `共找到 ${length} 次API属性调用`,
      details: {
        type: 'table',
        headings: ApiAttrCalledAudit.getHeadings(),
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

module.exports = ApiAttrCalledAudit;
