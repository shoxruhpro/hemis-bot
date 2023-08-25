"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = __importDefault(require("../config"));
exports.default = async (ctx) => {
    ctx.answerCallbackQuery("Iltimos, kuting...");
    ctx.deleteMessage();
    const res = await fetch(config_1.default.target + `education/attendance`, {
        headers: { Authorization: "Bearer " + ctx.session.token },
    });
    const { data, success } = await res.json();
    if (!success) {
        return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
            reply_markup: new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login"),
            parse_mode: "Markdown",
        });
    }
    let text = `*Qoldirgan darslaringiz*: ${data.length} ta\n`;
    let semester = ""; // Semesterlarni ajratish uchun.
    data.forEach((item) => {
        let date = new Date(item.lesson_date * 1000).toLocaleDateString("UZ");
        if (semester !== item.semester.name) {
            text += `\n*${item.semester.name}\n\n*`;
            semester = item.semester.name;
        }
        text += `*${item.subject.name}* | _${date}_ — \`${item.lessonPair.start_time}\`\n`;
    });
    ctx.reply(text, {
        reply_markup: new grammy_1.InlineKeyboard().text("🏠 Bosh sahifa", "home"),
        parse_mode: "Markdown",
    });
};
