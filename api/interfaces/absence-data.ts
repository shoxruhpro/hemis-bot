export default interface Absence {
  subject: { name: string };
  lesson_date: number;
  lessonPair: { start_time: string };
  semester: { name: string };
}
