const { eslint } = require('@axa-ch/easy-config');

module.exports = {
  extends: [eslint.base, eslint.react, eslint.typescript],
  rules: {
    'import/named': 0,
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: ['tests/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
  ],
};
