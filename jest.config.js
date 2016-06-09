module.exports = {
    scriptPreprocessor: "node_modules/babel-jest",
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
        "json",
        "react"
    ]
}