const Cathy = require("../index");
const cathy = new Cathy.Bot("Cathy");

cathy.load();

cathy.on("ready", () => {
    console.log("Ready!");

    cathy.chat("How are you?").then((i) => console.log(i.content));
});

cathy.on("debug", console.log);

cathy.on("error", console.error);