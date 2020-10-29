const express = require("express");
// const { Telegraf } = require("telegraf");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const { getRequestBotUrl, getNewIssueMessage } = require("./helpers");
// const config = require("config");

// const { BOT_TOKEN } = config;

const app = express();

// const bot = new Telegraf(BOT_TOKEN);

// bot.command("getChatId", (context) => {
//   context.reply(context.chat.id);
// });

// bot.launch();

app.use(express.json());

app.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  fs.readFile(
    path.join(__dirname, "views", "index.html"),
    "utf-8",
    (error, content) => {
      if (error) {
        throw error;
      }

      res.end(content);
    }
  );
});

app.post("/", (req, res) => {
  const payload = req.body;

  if (Object.keys(payload).includes("issue")) {
    const { issue } = payload;
    const api = getRequestBotUrl();
    const message = getNewIssueMessage(issue);
    try {
      fetch(api + message);
    } catch (error) {
      console.error(error);
    }
  }

  res.json(payload.issue.url);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server started on port:", PORT);
});

// const os = require("os");

// console.log(os.uptime() / 60 / 60);

// function initialHandler(req, res) {
//   if (req.method === "GET") {
//     res.writeHead(200, {
//       "Content-Type": "text/html; charset=utf-8",
//     });

//     if (req.url === "/") {
//       fs.readFile(
//         path.join(__dirname, "views", "index.html"),
//         "utf-8",
//         (error, content) => {
//           if (error) {
//             throw error;
//           }

//           res.end(content);
//         }
//       );
//     } else if (req.url === "/about") {
//       fs.readFile(
//         path.join(__dirname, "views", "about.html"),
//         "utf-8",
//         (error, content) => {
//           if (error) {
//             throw error;
//           }

//           res.end(content);
//         }
//       );
//     } else if (req.url === "/json") {
//       res.json({ message: "HelloWorld!" });
//       res.end();
//     }
//   }
// }

// const server = http.createServer(initialHandler);

// server.listen(PORT, () => {
//   console.log("Server started on port", PORT);
// });
