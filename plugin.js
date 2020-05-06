module.exports = {
  audits: [
    { path: 'lighthouse-plugin-arnold-diy/src/audits/api-method-called.js' },
    { path: 'lighthouse-plugin-arnold-diy/src/audits/api-attr-called.js' },
    { path: 'lighthouse-plugin-arnold-diy/src/audits/api-deprecated-called.js' },
    { path: 'lighthouse-plugin-arnold-diy/src/audits/api-duplicate-called.js' },
    { path: 'lighthouse-plugin-arnold-diy/src/audits/api-sync-called.js' },
    { path: 'lighthouse-plugin-arnold-diy/src/audits/api-error-called.js' },
  ],

  category: {
    title: '容器',
    description: '使用模拟器进行小程序及离线包h5性能审核',
    auditRefs: [
      { id: 'api-method-called', weight: 0, group: 'apiInfo' },
      { id: 'api-attr-called', weight: 0, group: 'apiInfo' },
      { id: 'api-deprecated-called', weight: 0, group: 'apiInfo' },
      { id: 'api-error-called', weight: 0, group: 'apiInfo' },
      { id: 'api-duplicate-called', weight: 6, group: 'apiInfo' },
      { id: 'api-sync-called', weight: 6, group: 'apiInfo' },
    ],
  },

  groups: {
    apiInfo: {
      title: 'API调用信息',
      description: '包含所有API调用情况、单个API调用次数等信息',
    },
  },
};
