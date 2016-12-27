const path = require('path')

global.pathTo = {
    view(type = "..", name ="") {
        let nameS = (name.slice(1) || "index").replace("/", "_")
        return path.join(__dirname, "..", "..","app","course", type, nameS)
    },
    assets(type = "js", name ="elium.js") {
        return path.join(__dirname, "..", "..","app","assets", type, name)
    },
    model (type) {
        return path.join(__dirname, "..", "..","app","course", type, "model", "index.js")
    },
    route (type) {
        return path.join(__dirname, "..", "..","app","course", type, "routes.js")
    },
    app (name) {
        return path.join(__dirname, "..", "..","app", name)
    },
    nodeRoot (...name) {
        return path.join(__dirname, "..", "..", ...name)
    },
    publicDir (type, name = "") {
        name = (name ?  "/"+ name : "")
        type = (type ?  "/"+ type : "")
        return path.join(__dirname, "..", "..", "public", type, name)
    }

}


global.requireView = function(type, name) {
    return require(pathTo.view(type, name))
}

global.requireModel= function(name) {
    return require(pathTo.model(name));
}

global.requireRoute= function(name) {
    return require(pathTo.route(name))
}

global.appRequire= function(name) {
    return require(pathTo.app(name))
}

global.rootRequire= function(name) {
    return require(pathTo.nodeRoot(name))
}
