const context = require.context('./', true, /^(?!.*index*$)(\.\/[a-zA-Z]+$)/i);
const modules = {};

context.keys().forEach((filename) => {
    let imported = context(filename);
    let moduleName = filename.substring(2);
    modules[moduleName] = imported.default || imported[moduleName];
});

export default modules;
