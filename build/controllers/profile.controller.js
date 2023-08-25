"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const uz_date_1 = __importDefault(require("../utils/uz-date"));
const config_1 = __importDefault(require("../config"));
exports.default = async (ctx) => {
    ctx.answerCallbackQuery("Iltimos, kuting...");
    ctx.deleteMessage();
    const res = await fetch(config_1.default.target + "account/me", {
        headers: {
            Authorization: "Bearer " + ctx.session.token,
        },
    });
    const { data, success } = await res.json();
    if (!success) {
        return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
            reply_markup: new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login"),
            parse_mode: "Markdown",
        });
    }
    const caption = `
*${data.full_name}*

▪️ *Tug'ilgan sana:* ${(0, uz_date_1.default)(data.birth_date, { year: true })}
▪️ *Status:* ${data.studentStatus.name}

▪️ *Mutaxassislik*: ${data.specialty.name}
▪️ *Fakultet*: ${data.faculty.name}
▪️ *Ta'lim shakli*: ${data.educationForm.name}
▪️ *Ta'lim turi*: ${data.educationType.name}
▪️ *Ta'lim tili*: ${data.educationLang.name}
▪️ *Kurs*: ${data.level.name}
▪️ *Guruh*: ${data.group.name}
`;
    ctx.replyWithPhoto(data.image, {
        caption: caption,
        reply_markup: new grammy_1.InlineKeyboard()
            .text("🔐 Parolni o'zgartirish", "update-password")
            .row()
            .text("🏠 Bosh menyu", "home"),
        parse_mode: "Markdown",
    });
};
