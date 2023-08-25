"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("@grammyjs/menu");
const logout_controller_1 = __importDefault(require("../controllers/logout.controller"));
const profile_controller_1 = __importDefault(require("../controllers/profile.controller"));
const academic_data_controller_1 = __importDefault(require("../controllers/academic-data.controller"));
const academic_sheet_controller_1 = __importDefault(require("../controllers/academic-sheet.controller"));
const attendance_controller_1 = __importDefault(require("../controllers/attendance.controller"));
const before_documents_1 = __importDefault(require("./before-documents"));
const config_1 = __importDefault(require("../config"));
const schedule_controller_1 = __importDefault(require("../controllers/schedule.controller"));
const main = new menu_1.Menu("main-menu")
    .text("👤 Profil", profile_controller_1.default)
    .submenu("📄 Hujjatlar", "documents-menu", before_documents_1.default)
    .row()
    .text("☑️ Davomat", attendance_controller_1.default)
    .text("🗓 Dars jadvali", schedule_controller_1.default)
    .row()
    .url("📢 Yangiliklar", config_1.default.channel)
    .text("✖️ Chiqish", logout_controller_1.default);
const documents = new menu_1.Menu("documents-menu")
    .text("📄 Reyting daftarcha", academic_data_controller_1.default)
    .text("📄 O`quv varaqa", academic_sheet_controller_1.default)
    .row()
    .back("🔙 Orqaga");
main.register(documents);
exports.default = main;
