import { Context } from "telegraf";

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
  return ctx.reply(text);
};
