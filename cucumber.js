const common = [
    'e2e/**/*.feature',
    '--require-module ts-node/register',
    '--require e2e/step-definitions/*.ts'
].join(' ');

module.exports = {
    default: common
};