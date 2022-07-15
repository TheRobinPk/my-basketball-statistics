export default {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'lcov'
  ],
  collectCoverageFrom: [
    'src/redux/reducers/**/*.ts',
    'src/redux/sagas/**/*.ts',
    'src/service/**/*.ts'
  ]
};
