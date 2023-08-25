"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = __importDefault(require("../config"));
exports.default = async (ctx) => {
    ctx.answerCallbackQuery("Yuklanmoqda...");
    ctx.deleteMessage();
    const res = await fetch(config_1.default.target +
        `student/document-download?id=${ctx.session.document_id}&type=academic_sheet`, {
        headers: { Authorization: "Bearer " + ctx.session.token },
    });
    if (!res.ok) {
        return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
            reply_markup: new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login"),
            parse_mode: "Markdown",
        });
    }
    const buffer = await res.arrayBuffer();
    ctx.replyWithDocument(new grammy_1.InputFile(new Uint8Array(buffer), "O`quv varaqa.pdf"), {
        reply_markup: new grammy_1.InlineKeyboard().text("🏠 Bosh sahifa", "home"),
    });
};
