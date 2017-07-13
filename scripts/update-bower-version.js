var fs = require('fs');
var bowerJsonPath = require.resolve('../bower.json');
var bowerJson = require(bowerJsonPath);

bowerJson.version = process.env.npm_package_version; // npm injects this

fs.writeFileSync(bowerJsonPath, JSON.stringify(bowerJson, null, 2));