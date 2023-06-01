const { eslint } = require('@axa-ch/easy-config');

module.exports = {
  extends: [eslint.base, eslint.react, eslint.typescript],
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
