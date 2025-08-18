const EventEmitter = require("events");

const emitter = new EventEmitter();


emitter.once("login", (user) => {
    console.log(`${user} logged in.`);
});

emitter.emit("login", "Raiyan");
emitter.emit("login", "Jiyon");
