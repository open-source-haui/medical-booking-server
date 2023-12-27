const fs = require('fs');
const path = require('path');
const { Telegraf } = require('telegraf');

const TOKEN = process.env.TOKEN_BOT;
const CHAT_ID = process.env.CHAT_ID;

const LOG_DIR = 'logs';
const pathLog = path.join(LOG_DIR, 'logger.log');

const bot = new Telegraf(TOKEN);

const logger = async (req) => {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR);
    }
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

    const infoUser = `${req.user.email}`;

    let userIP = '';

    if (process.env.NODE_ENV === 'production') {
      userIP = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'].split(', ')[0] || '';
    }

    const message = `${currentDate} - ${req.method} ${req.originalUrl} - ${infoUser}|${userIP}`;

    await fs.promises.appendFile(pathLog, message + '\n');
  } catch (error) {
    console.log(error.message);
  }
};

const sendLogger = async () => {
  try {
    const files = await fs.promises.readFile(pathLog, 'utf-8');

    if (!files) {
      return;
    }

    await bot.telegram.sendMessage(CHAT_ID, files);

    await fs.promises.writeFile(pathLog, '');
  } catch (error) {
    const currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

    await bot.telegram.sendMessage(CHAT_ID, `${currentDate} - ${error.message}`);
  }
};

module.exports = { logger, sendLogger };
