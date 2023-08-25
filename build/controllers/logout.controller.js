"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx) => {
    ctx.deleteMessage();
    ctx.session.token = null;
    await ctx.conversation.enter("login");
};
