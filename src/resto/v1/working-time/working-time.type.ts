export enum WeekDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export interface IWorkingTimeBase {
  isOpen: boolean;
  start: string;
  end: string;
  comment: string;
}
export interface IWeekdayWorkingData extends IWorkingTimeBase {
  index: number;
  weekday: WeekDay;
}
