import MyContext from "../types/my-context";

export default async (ctx: MyContext) => {
  ctx.deleteMessage();
  ctx.session.token = null;
  await ctx.conversation.enter("login");
};
