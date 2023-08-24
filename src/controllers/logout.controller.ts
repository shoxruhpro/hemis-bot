import MyContext from "../types/my-context";

export default async (ctx: MyContext) => {
  await ctx.deleteMessage();
  ctx.session.token = null;
  await ctx.conversation.enter("login");
};
