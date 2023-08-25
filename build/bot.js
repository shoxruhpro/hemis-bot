"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const conversations_1 = require("@grammyjs/conversations");
const home_controller_1 = __importDefault(require("./controllers/home.controller"));
const login_controller_1 = __importDefault(require("./controllers/login.controller"));
const password_controller_1 = __importDefault(require("./controllers/password.controller"));
const login_1 = __importDefault(require("./middlewares/login"));
const main_menu_1 = __importDefault(require("./middlewares/main-menu"));
const update_password_1 = __importDefault(require("./middlewares/update-password"));
const initial_1 = __importDefault(require("./utils/initial"));
const schedule_1 = __importDefault(require("./middlewares/schedule"));
const schedule_controller_1 = __importDefault(require("./controllers/schedule.controller"));
const config_1 = __importDefault(require("./config"));
const bot = new grammy_1.Bot(config_1.default.token);
// Middlewares
bot.use((0, grammy_1.session)({ initial: initial_1.default }));
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(login_1.default));
bot.use((0, conversations_1.createConversation)(update_password_1.default));
bot.use((0, conversations_1.createConversation)(schedule_1.default));
bot.use(main_menu_1.default);
// Routes
bot.command("start", home_controller_1.default); // Start bosilganda
bot.callbackQuery("login", login_controller_1.default); // Avtorizatsiya
bot.callbackQuery("home", home_controller_1.default); // Bosh sahifaga qaytish kerak bo'lsa
bot.callbackQuery("update-password", password_controller_1.default); // Parolni o'zgaritirish uchun
bot.callbackQuery("schedule", schedule_controller_1.default); // Dars jadvalini olish uchun
bot.on("message", async (ctx) => {
    ctx.reply("Nimadir noto'g'ri ketdi. /start buyrug'i yordamida botni qayta ishga tushiring.");
});
bot.catch(async (errorHandler) => {
    const ctx = errorHandler.ctx;
    // ctx.reply(
    //   "Nimadir noto'g'ri ketdi. /start buyrug'i yordamida botni qayta ishga tushiring."
    // );
    const { error } = errorHandler;
    if (error instanceof grammy_1.GrammyError) {
        console.error("Error in request:", error.stack);
    }
    else if (error instanceof grammy_1.HttpError) {
        console.error("Could not contact Telegram:", error);
    }
    else {
        console.error("Unknown error:", error);
    }
});
// Polling
// bot.start({ drop_pending_updates: true });
// Webhook
exports.default = bot;
