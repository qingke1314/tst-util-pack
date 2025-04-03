module.exports = {
  env: {
    // 支持浏览器、node环境、es2021
    browser: true,
    es2021: true,
    node: true,
  },
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12, // 即es2021
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off', // 允许不显示声明组件的propTypes
    'no-prototype-builtins': 'warn', // 直接调用对象原型方法警告
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_', // 检查未使用变量 _开头除外
      },
    ],
    'react/react-in-jsx-scope': 'off', // 允许在jsx中省略导入React
    'react/display-name': 'off', // 允许组件定义缺少显示名称
    'no-empty': ['error', { allowEmptyCatch: false }], // 禁止空语句块 除了catch
  }, // 自定义规则
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
};
