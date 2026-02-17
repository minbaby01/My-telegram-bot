import "dotenv/config";
import { Telegraf } from "telegraf";
import { block } from "./commands/block";
import { help } from "./commands/help";
import { status } from "./commands/status";
import { cancel } from "./commands/cancel";
import { start } from "./commands/start";
import { get } from "./commands/getItemPrice";
import { inventory } from "./commands/inventory";

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) throw new Error("Tele bot token not found");

export const bot = new Telegraf(TOKEN);

bot.command("block", block);
bot.command("cancel", cancel);
bot.command("help", help);
bot.command("status", status);
bot.command("start", start);
bot.command("get", get);
bot.command("inventory", inventory);
