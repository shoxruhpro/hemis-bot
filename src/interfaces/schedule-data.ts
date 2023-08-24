export default interface ScheduleData {
  _week: number;
  weekStartTime: number;
  weekEndTime: number;
  subject: { name: string };
  educationYear: { name: string };
  lesson_date: number;
  lessonPair: {
    start_time: string;
    end_time: string;
  };
  auditorium: { name: string };
}
