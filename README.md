# Student Platform

# structure
- Config
    - globa: store global functions
    - env: save env vars like db (this is gitignored)
    - server: start the server
    - Weback
        webpack.*: various configurations
        middleware: exports tools to run webpack as express middleware (https://github.com/webpack/webpack-dev-middleware)
    - Server: Extra Settings for server
    - lib: functions that we want to be globbaly avaliable
- app
    - Backend
        - controllers
        - models
    - FrontEnd
- public

