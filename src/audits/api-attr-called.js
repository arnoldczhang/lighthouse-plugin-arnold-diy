const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');

class ApiCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-attr-called',
      title: '所有API属性调用情况',
      failureTitle: '当前页面无API属性调用',
      description: '以页面为维度了解API属性的调用情况',
      requiredArtifacts: [
        'devtoolsLogs',
      ],
    };
  }

  static audit(artifacts) {
    const { attr: result } = getApiCalledMap(artifacts);
    const keys = Object.keys(result);
    const { length } = keys;
    return {
      score: 1,
      numericValue: length,
      displayValue: `共找到 ${length} 次API属性调用`,
      details: {
        type: 'table',
        headings: [
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
        ],
        items: keys.reduce((res, key) => {
          res.push({
            api: key,
            count: result[key],
          });
          return res;
        }, []),
      },
    };
  }
}

module.exports = ApiCalledAudit;
