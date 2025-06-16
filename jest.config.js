module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-native-js-polyfills)/"
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  