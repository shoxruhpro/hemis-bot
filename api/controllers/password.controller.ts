import MyContext from "../types/my-context";

export default async (ctx: MyContext) => {
  ctx.deleteMessage();
  await ctx.conversation.enter("updatePassword");
};
