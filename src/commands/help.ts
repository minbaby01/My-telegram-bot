import { Context } from "telegraf";

export const help = async (ctx: Context) => {
  const text = `
/block {id} 
/cancel
/count
/deposit {price}
/get
/help
/send
/start
/status
`;
  return ctx.reply(text);
};
