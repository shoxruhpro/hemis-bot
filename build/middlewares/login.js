"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = __importDefault(require("../config"));
async function login(conversation, ctx) {
    var _a, _b, _c, _d, _e, _f;
    let login, password;
    await ctx.reply("*Hemis axborot tizimidagi shaxsiy login raqamingizni yuboring*", {
        reply_markup: new grammy_1.InlineKeyboard().text("🔙 Bekor qilish", "home"),
        parse_mode: "Markdown",
    });
    // Loginnni olamiz
    let nextCtx = await conversation.waitFor(":text");
    if ((_a = nextCtx.message) === null || _a === void 0 ? void 0 : _a.text)
        login = parseInt((_b = nextCtx.message) === null || _b === void 0 ? void 0 : _b.text.trim());
    nextCtx.deleteMessage(); // Loginni o'chiramiz
    const chat_id = (_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id;
    const message_id = ((_d = nextCtx.message) === null || _d === void 0 ? void 0 : _d.message_id) - 1;
    await ctx.api.editMessageText(chat_id, message_id, "*Parolingizni yuboring*", { parse_mode: "Markdown" });
    // Parolni olamiz
    nextCtx = await conversation.waitFor(":text");
    nextCtx.deleteMessage(); // Parolni o'chiramiz
    if ((_e = nextCtx.message) === null || _e === void 0 ? void 0 : _e.text)
        password = (_f = nextCtx.message) === null || _f === void 0 ? void 0 : _f.text.trim();
    // Tokenni olamiz
    const res = await fetch(config_1.default.target + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            login,
            password,
        }),
    });
    const { data, success } = await res.json();
    if (success) {
        nextCtx.session.token = data.token;
        ctx.api.editMessageText(chat_id, message_id, "*Avtorizatsiyadan muvaffaqqiyatli o'tdingiz*", {
            reply_markup: new grammy_1.InlineKeyboard().text("🏠 Bosh menyu", "home"),
            parse_mode: "Markdown",
        });
    }
    else {
        ctx.api.editMessageText(chat_id, message_id, "*Login yoki parol xato!*", {
            reply_markup: new grammy_1.InlineKeyboard().text("🔑 Hisobga kirish", "login"),
            parse_mode: "Markdown",
        });
    }
}
exports.default = login;
