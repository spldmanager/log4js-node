/**
 * @Desc
 * @author Lenovo
 * @date 2018/11/19
 * @version
 */
function wslogAppender(layout, timezoneOffset) {
    return (loggingEvent)=>{
        if(global.ws){
            if(global.ws.isAlive && global.ws.readyState == 1 && global.ws.isWsLogger){
                var content = {data:loggingEvent.data,colour:loggingEvent.level.colour,categoryName:loggingEvent.categoryName,startTime:loggingEvent.startTime,levelStr:loggingEvent.level.levelStr}
                ws.send(JSON.stringify(content))
                // ws.send(`${layout(loggingEvent,timezoneOffset)}`)
                // console.log(`message send to sever with ${layout(loggingEvent,timezoneOffset)}`)
            }
        }
        // process.stdout.write(`${layout(loggingEvent,timezoneOffset)}`)
    }
}
function configure(config,layouts) {
    let layout = layouts.colouredLayout
    if(config.layout){
        layout = layouts.layout(config.layout.type, config.layout)
    }
    return wslogAppender(layout, config.timezoneOffset);
}
exports.configure = configure;
