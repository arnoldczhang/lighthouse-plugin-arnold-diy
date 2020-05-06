module.exports = {
    "extends": [
      'eslint:recommended',
      'plugin:vue/recommended',
    ],
  
    "globals": {
    },
  
    plugins: [
    ],
  
    "rules": {
      "no-param-reassign": [
        "error",
        {
          "props": false
        }
      ],
      "quotes": [
        2,
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ],
      "import/no-unresolved": [
        "off"
      ],
      "import/prefer-default-export": [
        "off"
      ],
      "no-underscore-dangle": 0,
      "global-require": 0,
      "import/extensions": ['off', 'never'],
      "comma-dangle": [
        "error",
        "only-multiline"
      ],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "class-methods-use-this": 0,
      "vue/max-attributes-per-line": 0,
      "object-curly-newline": 0
    },
  
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      allowImportExportEverywhere: false,
      ecmaFeatures: {
        legacyDecorators: true
      }
    },
  };
  