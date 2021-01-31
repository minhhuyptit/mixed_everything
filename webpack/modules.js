const fs = require("fs");
var coreConfig = require("./webpack.config");
var path = require("path");
let argv = require("yargs").argv;

// Reade file module.json => get json data of module
function jsonReader(filePath, cb) {
    let contents = fs.readFileSync(filePath, "utf8");
    const object = JSON.parse(contents);
    return cb && cb(null, object);
}

// Read file module.json and parse to config module
function exportModuleConfigToBuild(modulePath) {
    try {
        if (fs.existsSync(modulePath)) {
            //file exists
            jsonReader(modulePath, (err, dataModules) => {
                if (err) {
                    console.log(`error json reader: ${err}`);
                    return;
                }
                dataModules.forEach(function(dataModule) {
                    // Parse data json module to config of module export
                    let portalConfig = Object.assign({}, coreConfig, {
                        name: dataModule.name,
                        entry: [dataModule.input],
                        output: {
                            sourceMapFilename: dataModule.sourceMapFileName,
                            path: path.resolve(dataModule.outputPath),
                            publicPath: dataModule.publicPath,
                            filename: dataModule.fileName
                        },
                        resolve: {
                            extensions: dataModule.extensions,
                            alias: {
                                vue$: "vue/dist/vue.esm.js",
                                "@": path.resolve(dataModule.resolvePath)
                            }
                        }
                    });
                    arrayModules.push(portalConfig);
                });
            });
        }
    } catch (err) {
        console.log(`error file not exists: ${err}`);
    }
}

let isPushBabel = false;
let arrayModules = [];
let basePath = "./frontend";
let env = argv.env;
console.log(argv.env.akai);
let moduleName = env || null;
let portalPath = `${basePath}`;
let modulePath = `${portalPath}/${moduleName}/module.json`;

exportModuleConfigToBuild(modulePath);
module.exports = arrayModules;
