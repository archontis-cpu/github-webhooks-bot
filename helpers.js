const config = require("config");

const { BOT_TOKEN, CHAT_ID, CONTRIBUTORS } = config;

function getTelegramUser(githubLogin) {
  return CONTRIBUTORS.find((item) => {
    return item.githubLogin === githubLogin;
  });
}

function getRequestBotUrl() {
  const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;
  return `${API_BASE}/sendMessage?chat_id=${CHAT_ID}&text=`;
}

function getNewIssueMessage({ user, number, title, html_url }) {
  const telegramUser = getTelegramUser(user.login);
  const text =
    `<a href="tg://user?id=${telegramUser.telegramUserId}">${telegramUser.name}</a>` +
    ` has opened a new issue №${number} <a href="${html_url}">"${title}"</a>`;

  return encodeURI(text) + "&parse_mode=html&disable_web_page_preview=true";
}

module.exports = {
  getRequestBotUrl,
  getNewIssueMessage,
};
