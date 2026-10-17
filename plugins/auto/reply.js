
export default async function before(m, { conn }) {
  const videos = {
    "تست": "https://files.catbox.moe/9b6x2n.mp4",
    "بوت": "https://files.catbox.moe/9b6x2n.mp4",
    "لايت": "https://files.catbox.moe/32lk04.mp4"
  };

  const text = m.text?.trim();

  if (!videos[text]) return false;

  // إرسال ريأكت مع تجاهل فشل الريأكت حتى لا يتعطل الأمر
  const react = async (emoji) => {
    try {
      await conn.sendMessage(m.chat, {
        react: {
          text: emoji,
          key: m.key
        }
      });
    } catch (err) {
      console.error("Reaction Error:", err);
    }
  };

  try {
    // 1. بدأ التنفيذ
    await react("⏳");

    // 2. تجهيز الإرسال
    await react("✅");

    // 3. إرسال الفيديو الدائري
    await conn.sendMessage(
      m.chat,
      {
        video: { url: videos[text] },
        ptv: true,
        mimetype: "video/mp4"
      },
      { quoted: m }
    );

    // 4. اكتمل الإرسال
    await react("💀");

  } catch (err) {
    console.error("Video Send Error:", err);
    await react("❌");
  }

  return true;
}
