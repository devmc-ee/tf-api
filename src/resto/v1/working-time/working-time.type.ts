export enum WeekDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export interface IWeekdayWorkingData {
  index: number;
  isOpen: boolean;
  start: string;
  end: string;
  comment: string;
  weekday: WeekDay;
}
