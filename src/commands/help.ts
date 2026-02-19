import { Context } from "grammy";

export const help = async (ctx: Context) => {
  const text = `
/block {id} 
/cancel
/inventory
/get
/help
/start
/status
`;
  return await ctx.reply(text);
};
