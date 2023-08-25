"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grammy_1 = require("grammy");
const bot_1 = __importDefault(require("./bot"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.all("/status", async (req, res) => {
    res.sendStatus(200);
});
app.use("/bot", (0, grammy_1.webhookCallback)(bot_1.default, "express", { secretToken: config_1.default.secret_token }));
app.listen(3000).on("error", (event) => {
    console.log("Xatolik yuz berdi", event.cause);
});
