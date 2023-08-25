import { Context, SessionFlavor } from "grammy";
import SessionData from "../interfaces/session-data";
import { type ConversationFlavor } from "@grammyjs/conversations";

type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;

export default MyContext;
