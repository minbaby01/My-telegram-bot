import { VercelRequest, VercelResponse } from "@vercel/node";
import { bot } from "../src/index";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // is admin
        const adminId = process.env.ADMIN_ID;
        if (req.body?.message?.from?.id != adminId) {
            return res.status(401).json({
                message: 'Who are you'
            });
        }

        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
            return res.status(200).json({
                message: 'OK'
            });
        }

        res.status(200).json({
            message: 'Hello'
        });
    } catch (err) {
        console.error('Handler error:', err);
        res.status(500).json({
            error: "Error"
        });
    }
}