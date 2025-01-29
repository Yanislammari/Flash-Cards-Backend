module.exports = {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": ["ts", "js"],
    "transform": {
      "^.+\\.ts?$": "ts-jest"
    },
    "moduleNameMapper": {
      "^(\\.{1,2}/.*)\\.js$": "$1"
    }
}