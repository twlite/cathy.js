# Cathy.js
Simple chatbot package based on AIML.

> # Project moved to **[https://github.com/Project-IX/cathy](https://github.com/Project-IX/cathy)**

# Installing

```sh
npm install cathy.js
```

# Features
- No api key required
- fast
- simple
- easy

# Getting Started

```js
const Cathy = require("cathy.js");
const cathy = new Cathy.Bot();

cathy.on("ready", () => console.log("Bot is ready!"));

cathy.load();
```

# Chatting

```js
const message = await cathy.chat("hello");
console.log(message.content);
```

# Discord Server
**[https://discord.gg/2SUybzb](https://discord.gg/2SUybzb)**

> More features soon!
