"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = __importDefault(require("../config"));
exports.default = async (ctx) => {
    if (!ctx.session.document_id) {
        const res = await fetch(config_1.default.target + "student/document", {
            headers: { Authorization: `Bearer ${ctx.session.token}` },
        });
        const { data, success } = await res.json();
        if (success) {
            ctx.session.document_id = data[0].id;
        }
        else {
            return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
                reply_markup: new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login"),
                parse_mode: "Markdown",
            });
        }
    }
    ctx.editMessageText("*Hujjatlar*", { parse_mode: "Markdown" });
};
