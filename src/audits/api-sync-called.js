const { Audit } = require('lighthouse');
const { getApiCalledMap } = require('../utils');
const { SyncRE } = require('../re');

class ApiSyncCalledAudit extends Audit {
  static get meta() {
    return {
      id: 'api-sync-called',
      title: 'API同步方法调用情况',
      description: '同步调用耗时过长会阻塞线程小程序的整个流程，因此建议尽量避免同步调用，并控制调用次数。',
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
    const keys = Object.keys(result).filter(key => SyncRE.test(key));
    const { length } = keys;
    return {
      score: Math.max(1 - length * 0.1, 0),
      displayValue: `共找到 ${length} 次API同步方法调用`,
      details: {
        type: 'table',
        headings: ApiSyncCalledAudit.getHeadings(),
        items: keys.reduce((res, key) => {
          const { count } = result[key];
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

module.exports = ApiSyncCalledAudit;
