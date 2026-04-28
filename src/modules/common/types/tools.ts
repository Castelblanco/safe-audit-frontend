import type { FORMATS_DATE } from '@constants/formats';

// DATETIME
export type TDatetime = {
    now: () => Date;
    fromDate: (date: Date) => Date;
    fromISOText: (iso: string) => Date;
    fromTimestamp: (timestamp: number) => Date;
    fromFormat: (text: string, format: FORMATS_DATE) => Date;
    plus: (date: Date, unit: DatetimeUnits, count: number) => Date;
    minus: (date: Date, unit: DatetimeUnits, count: number) => Date;
    resetDateToStart: (date: Date, unit: DatetimeUnit) => Date;
    resetDateToEnd: (date: Date, unit: DatetimeUnit) => Date;
    formatToText: (date: Date, format: FORMATS_DATE) => string;
};

export type DatetimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
export type DatetimeUnits = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

export const enum TIMES {
    SECOND = 1000,
    MINUTE = 60_000,
    HOUR = 3_600_000,
    DAY = 86_400_000,
    WEEK = 604_800_000,
    MONTH = 2_592_000_000,
    YEAR = 31_536_000_000,
}
