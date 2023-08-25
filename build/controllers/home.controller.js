"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const main_menu_1 = __importDefault(require("../middlewares/main-menu"));
const config_1 = __importDefault(require("../config"));
exports.default = async (ctx) => {
    ctx.deleteMessage();
    let keyboard;
    let text = `*${config_1.default.name}*\n*HEMIS Student axborot tizimi*\n\n`;
    if (!ctx.session.token) {
        text += "_Foydalanish uchun avval hisobingizga kiring._";
        keyboard = new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login");
    }
    else {
        keyboard = main_menu_1.default;
    }
    ctx.reply(text, {
        reply_markup: keyboard,
        parse_mode: "Markdown",
    });
};
