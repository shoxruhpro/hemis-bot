import { InlineKeyboard } from "grammy";
import MyContext from "../types/my-context";
import MyConversation from "../types/my-conversation";
import ScheduleData from "../interfaces/schedule-data";
import uzDate from "../utils/uz-date";
import config from "../config";

export default async function schedule(
  conversation: MyConversation,
  ctx: MyContext
) {
  ctx.answerCallbackQuery("Iltimos, kuting...");

  const res = await fetch(config.target + "education/schedule", {
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

  const schedules: Record<string, ScheduleData[]> = {};

  data.forEach((item) => {
    if (!schedules.hasOwnProperty(item._week)) schedules[item._week] = [];
    schedules[item._week].push(item);
  });

  const weekButtons = Object.keys(schedules).map((key) => {
    const schedule = schedules[key][0];
    const start = uzDate(schedule.weekStartTime);
    const end = uzDate(schedule.weekEndTime);

    return [InlineKeyboard.text(`${start} / ${end}`, `w-${schedule._week}`)];
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
  const nextCtx = await conversation.waitForCallbackQuery(/^w-\d+$/);
  const _week = parseInt(nextCtx.callbackQuery?.data?.split("-")[1] as string);

  let text = "";
  let weekdayForSplitting = 0; // Hafta kunlarini ajratish uchun.

  schedules[_week].forEach((item) => {
    const weekday = uzDate(item.lesson_date, { weekday: true });

    if (weekdayForSplitting !== item.lesson_date) {
      text += `\n*${weekday.toUpperCase()}*\n`;

      weekdayForSplitting = item.lesson_date;
    }

    text += `${item.subject.name} | \`${item.lessonPair.start_time} - ${item.lessonPair.end_time}\` | _${item.auditorium.name}_\n`;
  });

  nextCtx.editMessageText(text, {
    reply_markup: new InlineKeyboard().text("🏠 Bosh menyu", "home"),
    parse_mode: "Markdown",
  });
}
