"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    channel: process.env.CHANNEL,
    token: process.env.TOKEN,
    target: process.env.TARGET,
    name: process.env.NAME,
    secret_token: process.env.SECRET_TOKEN,
};
