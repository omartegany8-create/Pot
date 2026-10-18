
let handler = async (m, { conn }) => {
    // 1. تحديد بيانات الرقم المستهدف والاسم المزخرف
    let number = '201158601817';
    let userJid = number + '@s.whatsapp.net';
    let displayName = 'mero 🕷️';
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${displayName}\nTEL;type=CELL;type=VOICE;waid=${number}:+${number}\nEND:VCARD`;

    // 2. إرسال جهة الاتصال فقط
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: displayName, 
            contacts: [{ vcard }] 
        } 
    }, { quoted: m });

    // 3. إضافة الرقم مباشرة للمجموعة عبر صلاحيات المشرف
    try {
        await conn.groupParticipantsUpdate(m.chat, [userJid], 'add');
    } catch (e) {
        console.error('تعذر إضافة الرقم، تأكد من رفع البوت أدمن أولاً:', e);
    }
};

handler.help = ['طيير'];
handler.tags = ['owner'];
handler.command = /^طيير$/i;
handler.owner = true; 

export default handler;
