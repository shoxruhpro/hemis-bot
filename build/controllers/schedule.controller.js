"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx) => {
    ctx.deleteMessage();
    await ctx.conversation.enter("schedule");
};
