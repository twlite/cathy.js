const fs = require("fs");
const AIML = require("aimlinterpreter");
const { EventEmitter } = require("events");
const Util = require("./Util");

class Cathy extends EventEmitter {

    constructor(name, age) {
        super();

        if (!name || typeof name !== "string") name = "Cathy";
        if (!age || isNaN(age)) age = 14;

        /**
         * Bot Name
         * @type {string}
         */
        this.name = name;

        /**
         * Bot age
         * @type {number}
         */
        this.age = age;

        /**
         * Internal AIML Manager
         * @ignore
         * @private
         */
        this._AIML = new AIML({ name: this.name, age: this.age });
    }

    /**
     * Loads the chatbot
     */
    load() {
        return new Promise((resolve, reject) => {
            fs.readdir(__dirname + "/AIML/", (error, files) => {
                if (error) {
                    let emitted = this.emit("error", error);
                    if (!emitted) throw new Error(error);
                    return;
                };
                this.files = files.filter(i => i.endsWith(".aiml"));
                if (files.length < 1) throw new Error("No aiml files found!");
                this.files.forEach(x => this.emit("debug", `Loading file ${x}...`));
                this._AIML.loadAIMLFilesIntoArray(this.files.map(m => `${__dirname}/AIML/${m}`));
                this.files = files;
                this.emit("ready");
            });
        });
    }

    /**
     * Chat with cathy
     * @param {string} message Message input
     * @returns {object}
     * @example const message = await cathy.chat("How are you?");
     * console.log(message.content);
     */
    chat(message) {
        return new Promise((resolve, reject) => {
            if (this.files.length < 1) reject(new Error("Cannot call chat() before load()"));
            if (!message || typeof message !== "string") reject(new Error("Input may not be empty."));
            this._AIML.findAnswerInLoadedAIMLFiles(message, (answer, wildCardArray, input) => {
                this.emit("debug", `Input: ${input}`);
                const obj = {
                    content: Util.clean(answer),
                    wca: wildCardArray,
                    input
                };
                resolve(obj);
            });
        });
    }

}

module.exports = Cathy;