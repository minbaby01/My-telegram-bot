import "dotenv/config";
import { Telegraf } from "telegraf";
import { block } from "./commands/block";
import { deposit } from "./commands/deposit";
import { help } from "./commands/help";
import { status } from "./commands/status";
import { cancel } from "./commands/cancel";
import { count } from "./commands/count";
import { start } from "./commands/start";
import { send } from "./commands/send";
import { getItemPrice } from "./commands/getItemPrice";
import { rate } from "./commands/rate";

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) throw new Error("Tele bot token not found");

export const bot = new Telegraf(TOKEN);

bot.command("block", block);
bot.command("cancel", cancel);
bot.command("count", count);
bot.command("deposit", deposit);
bot.command("help", help);
bot.command("status", status);
bot.command("start", start);
bot.command("send", send);
bot.command("get", getItemPrice);
bot.command("rate", rate);
