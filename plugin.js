module.exports = {
  // Additional audits to run on information Lighthouse gathered.
  audits: [{ path: 'lighthouse-plugin-arnold-diy/src/audits/has-cat-images.js' }],

  // A new category in the report for the plugin output.
  category: {
    title: 'Cats2',
    description:
      'When integrated into your website effectively, cats deliver delight and bemusement.',
    auditRefs: [
      { id: 'has-cat-images-id', weight: 1, group: 'aa' },
      {id: "accesskeys", weight: 10},
      {id: "uses-passive-event-listeners", weight: 1}
    ],
  },

  groups: {
    aa: {
      title: 'Aa',
      description: 'abcdefg',
    },
  },
};
