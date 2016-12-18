// ---------------------------------------------
// handles all the routes of the app
//

function DefineRouteWrapper(route) {
    const fun = function () {}
    fun.value = route
    return fun
}

const RouteHandler = {
    apply: function(target, thisArg, argumentsList) {
        return (typeof target.value === "function" ? target.value(argumentsList) : target.value)
    }
}

class AppRoutes {
    constructor(obj = {}) {
        this.routes = obj
    }

    add(obj = {}) {
        let objwrap = {}
        let route
        for (route in obj) {
            objwrap[route] =  new Proxy(DefineRouteWrapper(obj[route]), RouteHandler)
        }
        return this.routes = Object.assign({}, this.routes, objwrap)
    }

    get all() {
        return this.routes
    }

    get AppRoutesHandler() {
        return {
            get: function(target, name){
                const routeUrl = target.all[name]
                return routeUrl ? routeUrl : target[name]
            }
        }
    }
}


const InitializeAppRoutes = new AppRoutes

// this allowes us to call the route name by the key directly
global.AppRoutes = new Proxy(InitializeAppRoutes, InitializeAppRoutes.AppRoutesHandler);
