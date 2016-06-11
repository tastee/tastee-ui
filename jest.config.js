module.exports = {
    collectCoverage: true,
    scriptPreprocessor: "node_modules/babel-jest",
    preprocessorIgnorePatterns: ["node_modules","tasty-core/app/tasty-core"],
    unmockedModulePathPatterns: [
        "node_modules/react",
        "node_modules/react-dom",
        "node_modules/react-addons-test-utils",
        "node_modules/fbjs"
    ],
    testDirectoryName: "tests",
    testPathIgnorePatterns: [
        "node_modules",
        "spec/support"
    ],
    moduleFileExtensions: [
        "js",
        "jsx",
        "json",
        "react"
    ]
}