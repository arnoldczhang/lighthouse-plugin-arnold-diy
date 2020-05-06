const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');
const { MAX_CALLED } = require('../const');

class ApiDuplicateCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-duplicate-called',
      title: 'API被重复调用情况',
      description: '过多调用同一个 JSAPI，可能存在 JSAPI 滥用的情况，建议对于状态类的 JSAPI 请求，在本地进行数据缓存，以减少调用次数',
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
    const apiMap = getApiCalledMap(artifacts);
    const result = Object.keys(apiMap).reduce((res, key) => {
      const map = apiMap[key];
      const matched = Object.keys(map).filter(k => map[k].count >= MAX_CALLED);
      res.push(...matched.map(k => ({ key: k, ...map[k] })));
      return res;
    }, []);
    const { length } = result;
    return {
      score: Math.max(1 - length * 0.1, 0),
      displayValue: `共找到 ${length} 次API重复调用`,
      details: {
        type: 'table',
        headings: ApiDuplicateCalledAudit.getHeadings(),
        items: result.reduce((res, { count, key }) => {
          res.push({
            api: key,
            count,
          });
          return res;
        }, []),
      },
    };
  }
}

module.exports = ApiDuplicateCalledAudit;
