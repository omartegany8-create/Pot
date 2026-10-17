export default async function before(m, { conn }) {

  const videos = {
    "تست": "https://files.catbox.moe/htisw3.mp4",
    "بوت": "https://files.catbox.moe/9b6x2n.mp4",
    "e": "https://files.catbox.moe/32lk04.mp4⁠"
  };

  const text = m.text?.trim();

  if (videos[text]) {

    await conn.sendMessage(
      m.chat,
      {
        video: { url: videos[text] },
        ptv: true,
        mimetype: "video/mp4"
      },
      { quoted: m }
    );

    return true;
  }

  return false;
}
