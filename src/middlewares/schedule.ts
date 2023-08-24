import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import MyConversation from "../types/my-conversation";
import ScheduleData from "../interfaces/schedule-data";
import uzDate from "../utils/uz-date";
import { InlineKeyboardButton, KeyboardButton } from "grammy/types";

export default async function schedule(
  conversation: MyConversation,
  ctx: MyContext
) {
  const res = await fetch(process.env.TARGET + "education/schedule", {
    headers: {
      Authorization: "Bearer " + ctx.session.token,
    },
  });

  const { success, data }: { success: boolean; data: ScheduleData[] } =
    await res.json();

  if (!success) {
    return await ctx.editMessageText("*Hisobingizga qayta kiring!*", {
      reply_markup: new InlineKeyboard().text("🔑 Hisobga kirish", "login"),
      parse_mode: "Markdown",
    });
  }

  let week = 0; // Haftalarni ajratish uchun.
  const weekButtons = data
    .filter((item: ScheduleData) => {
      if (week === 0 || item._week !== week) {
        week = item._week;
        return true;
      }

      return false;
    })
    .map(({ weekStartTime, weekEndTime, _week }: ScheduleData) => {
      const start = uzDate(weekStartTime);
      const end = uzDate(weekEndTime);

      return [InlineKeyboard.text(`${start} / ${end}`, `w-${_week}`)];
    });

  weekButtons.push([InlineKeyboard.text("🏠 Bosh menyu", "home")]);

  await ctx.reply(
    `*${data[0].educationYear.name} o'quv yili uchun dars jadvali*`,
    {
      parse_mode: "Markdown",
      reply_markup: InlineKeyboard.from(weekButtons),
    }
  );

  // Haftani olamiz
  let nextCtx = await conversation.waitForCallbackQuery(/^w-\d+$/);
  const _week = parseInt(nextCtx.callbackQuery?.data?.split("-")[1] as string);

  let text = "";
  let weekdayForSplitting = 0; // Hafta kunlarini ajratish uchun.
  data
    .filter((item: ScheduleData) => item._week === _week)
    .forEach((item) => {
      const weekday = uzDate(item.lesson_date, { weekday: true });

      if (weekdayForSplitting !== item.lesson_date) {
        text += `\n*${weekday.toUpperCase()}*\n`;

        weekdayForSplitting = item.lesson_date;
      }

      text += `${item.subject.name} | \`${item.lessonPair.start_time} - ${item.lessonPair.end_time}\` | _${item.auditorium.name}_\n`;
    });

  await nextCtx.editMessageText(text, {
    reply_markup: new InlineKeyboard().text("🏠 Bosh menyu", "home"),
    parse_mode: "Markdown",
  });
}
