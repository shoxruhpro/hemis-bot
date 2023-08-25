"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const uz_date_1 = __importDefault(require("../utils/uz-date"));
const config_1 = __importDefault(require("../config"));
async function schedule(conversation, ctx) {
    var _a, _b;
    ctx.answerCallbackQuery("Iltimos, kuting...");
    const res = await fetch(config_1.default.target + "education/schedule", {
        headers: {
            Authorization: "Bearer " + ctx.session.token,
        },
    });
    const { success, data } = await res.json();
    if (!success) {
        return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
            reply_markup: new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login"),
            parse_mode: "Markdown",
        });
    }
    const schedules = {};
    data.forEach((item) => {
        if (!schedules.hasOwnProperty(item._week))
            schedules[item._week] = [];
        schedules[item._week].push(item);
    });
    const weekButtons = Object.keys(schedules).map((key) => {
        const schedule = schedules[key][0];
        const start = (0, uz_date_1.default)(schedule.weekStartTime);
        const end = (0, uz_date_1.default)(schedule.weekEndTime);
        return [grammy_1.InlineKeyboard.text(`${start} / ${end}`, `w-${schedule._week}`)];
    });
    weekButtons.push([grammy_1.InlineKeyboard.text("🏠 Bosh menyu", "home")]);
    await ctx.reply(`*${data[0].educationYear.name} o'quv yili uchun dars jadvali*`, {
        parse_mode: "Markdown",
        reply_markup: grammy_1.InlineKeyboard.from(weekButtons),
    });
    // Haftani olamiz
    const nextCtx = await conversation.waitForCallbackQuery(/^w-\d+$/);
    const _week = parseInt((_b = (_a = nextCtx.callbackQuery) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.split("-")[1]);
    let text = "";
    let weekdayForSplitting = 0; // Hafta kunlarini ajratish uchun.
    schedules[_week].forEach((item) => {
        const weekday = (0, uz_date_1.default)(item.lesson_date, { weekday: true });
        if (weekdayForSplitting !== item.lesson_date) {
            text += `\n*${weekday.toUpperCase()}*\n`;
            weekdayForSplitting = item.lesson_date;
        }
        text += `${item.subject.name} | \`${item.lessonPair.start_time} - ${item.lessonPair.end_time}\` | _${item.auditorium.name}_\n`;
    });
    nextCtx.editMessageText(text, {
        reply_markup: new grammy_1.InlineKeyboard().text("🏠 Bosh menyu", "home"),
        parse_mode: "Markdown",
    });
}
exports.default = schedule;
