module.exports = {
  root: true,
  env: { node: true, es2021: true },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
  ],
  rules: {
    // project choices (keep these if you want the “no spaces in braces” style)
    "object-curly-spacing": ["error", "never"],
    "max-len": [
      "error",
      {
        code: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "quote-props": ["error", "consistent"],
    indent: ["error", 2, { SwitchCase: 1 }],
  },
};
