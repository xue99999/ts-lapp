//简单事件处理
var event = {};

var eventList = [];
var eventFunc = [];

function listenEvent(eventName, fun) {
    let now = new Date().getTime();
    if (eventList.indexOf(eventName) == -1) {
        eventList.push(eventName);

        eventFunc[eventName] = {
            name: eventName,
            funcs: []
        }

        eventFunc[eventName].funcs.push({
            fun: fun,
            id: now
        });
        return now;
    } else {
        eventFunc[eventName].funcs.push({
            fun: fun,
            id: now
        });
        return now;
    }
}

function fireEvent(eventName, extras) {
    if (eventList.indexOf(eventName) == -1) {
        eventList.push(eventName);

        eventFunc[eventName] = {
            name: eventName,
            funcs: []
        }
    } else {
        for (var i = 0; i < eventFunc[eventName].funcs.length; i++) {
            try {
                var fun = eventFunc[eventName].funcs[i].fun;
                fun(extras);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

function removeEvent(eventName, id) {
    if (eventList.indexOf(eventName) == -1) {
        return;
    } else {
        for (var i = 0; i < eventFunc[eventName].funcs.length; i++) {
            if (eventFunc[eventName].funcs[i].id == id) {
                eventFunc[eventName].funcs.splice(i, 1);
            }
        }
    }
}

event.listenEvent = listenEvent;
event.fireEvent = fireEvent;
event.removeEvent = removeEvent;

module.exports = event;