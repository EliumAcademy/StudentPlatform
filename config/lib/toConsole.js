// ---------------------------------------------
// preatty print utility
const stackTract = require('stack-trace')
const colors = require('colors')


global.toConsole= function(...args) {
    console.log("------------------------------------------------------------------------------------------------------------------------")
    console.log(stackTract.get()[1].getFileName().yellow + ":" + (stackTract.get()[2].getLineNumber()+"").yellow)
    console.log(("TYPENAME: " + stackTract.get()[1].getTypeName()).cyan, ",", 
                ("METHODNAME: "+ stackTract.get()[1].getMethodName()).cyan )
    args.map((arg)=>console.log("#=>".green, arg))
    console.log()
}
