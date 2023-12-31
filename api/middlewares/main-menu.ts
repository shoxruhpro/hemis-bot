import { Menu } from "@grammyjs/menu";

import logout from "../controllers/logout.controller";
import profile from "../controllers/profile.controller";
import academicData from "../controllers/academic-data.controller";
import academicSheet from "../controllers/academic-sheet.controller";
import attendance from "../controllers/attendance.controller";

import beforeDocuments from "./before-documents";
import MyContext from "../types/my-context";
import config from "../config";
import scheduleController from "../controllers/schedule.controller";

const main = new Menu<MyContext>("main-menu")
  .text("👤 Profil", profile)
  .submenu("📄 Hujjatlar", "documents-menu", beforeDocuments)
  .row()
  .text("☑️ Davomat", attendance)
  .text("🗓 Dars jadvali", scheduleController)
  .row()
  .url("📢 Yangiliklar", config.channel)
  .text("✖️ Chiqish", logout);

const documents = new Menu<MyContext>("documents-menu")
  .text("📄 Reyting daftarcha", academicData)
  .text("📄 O`quv varaqa", academicSheet)
  .row()
  .back("🔙 Orqaga");

main.register(documents);

export default main;
