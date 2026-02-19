import "dotenv/config";
import { Bot, webhookCallback } from "grammy";
import { block } from "./commands/block.js";
import { help } from "./commands/help.js";
import { status } from "./commands/status.js";
import { cancel } from "./commands/cancel.js";
import { start } from "./commands/start.js";
import { get } from "./commands/getItemPrice.js";
import { inventory } from "./commands/inventory.js";
import { chatbotController } from "./controllers/chatbotController.js";

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("Tele token not found");

export const bot = new Bot(BOT_TOKEN);

bot.command("block", block);
bot.command("cancel", cancel);
bot.command("help", help);
bot.command("status", status);
bot.command("start", start);
bot.command("get", get);
bot.command("inventory", inventory);

bot.on("message", chatbotController);

export const cb = webhookCallback(bot, "https");
