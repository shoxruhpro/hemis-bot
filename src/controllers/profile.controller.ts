import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import uzDate from "../utils/uz-date";

export default async (ctx: MyContext) => {
  const res = await fetch(process.env.TARGET + "account/me", {
    headers: {
      Authorization: "Bearer " + ctx.session.token,
    },
  });

  const { data, success } = await res.json();

  await ctx.deleteMessage();

  if (!success) {
    return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
      reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
      parse_mode: "Markdown",
    });
  }

  const caption = `
*${data.full_name}*

▪️ *Tug'ilgan sana:* ${uzDate(data.birth_date, { year: true })}
▪️ *Status:* ${data.studentStatus.name}

▪️ *Mutaxassislik*: ${data.specialty.name}
▪️ *Fakultet*: ${data.faculty.name}
▪️ *Ta'lim shakli*: ${data.educationForm.name}
▪️ *Ta'lim turi*: ${data.educationType.name}
▪️ *Ta'lim tili*: ${data.educationLang.name}
▪️ *Kurs*: ${data.level.name}
▪️ *Guruh*: ${data.group.name}
`;

  await ctx.replyWithPhoto(data.image, {
    caption: caption,
    reply_markup: new InlineKeyboard()
      .text("🔐 Parolni o'zgartirish", "update-password")
      .row()
      .text("🏠 Bosh menyu", "home"),
    parse_mode: "Markdown",
  });
};
