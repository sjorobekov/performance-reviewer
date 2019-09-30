module.exports = {
  "root": true,
  extends: [
    'plugin:vue/recommended'
  ],
  "env": {
    "node": true
  },
  "rules": {
    "indent": ["error", 2, {"FunctionDeclaration": {"parameters": "first"}}],
    "semi": ["error", "never"],
    "import/no-extraneous-dependencies": 0,
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "class-methods-use-this": 0,
    "no-param-reassign": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': ["error", {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: true,
      }
    }]
  },
  globals: {
    use: true
  }
}
