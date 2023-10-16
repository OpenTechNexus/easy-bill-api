// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest/presets/default',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};