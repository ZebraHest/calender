export interface EventData {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  flexible: boolean;
  duration: string;
  repeating: boolean;
  repeatStartDate: string;
  repeatEndDate: string;
  userId: string;
  repeatDays: string[];
}
