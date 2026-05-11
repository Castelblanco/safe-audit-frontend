import type { FORMATS_DATE } from '@constants/formats';
import type { DatetimeUnit, DatetimeUnits, TDatetime } from '@common/types/tools';
import { DateTime } from 'luxon';

export class Datetime implements TDatetime {
    now = (): Date => DateTime.utc().toJSDate();

    fromDate = (date: Date): Date => {
        return DateTime.fromJSDate(date).toUTC().toJSDate();
    };
    fromISOText = (iso: string): Date => {
        return DateTime.fromISO(iso, { zone: 'utc' }).toJSDate();
    };
    fromTimestamp = (timestamp: number): Date => {
        return DateTime.fromMillis(timestamp).toUTC().toJSDate();
    };
    fromFormat = (text: string, format: FORMATS_DATE): Date => {
        return DateTime.fromFormat(text, format).toUTC().toJSDate();
    };

    toMillis = (date: Date): number => DateTime.fromJSDate(date).toMillis();

    plus = (date: Date, unit: DatetimeUnits, count: number): Date => {
        return DateTime.fromJSDate(date)
            .plus({
                [unit]: count,
            })
            .toJSDate();
    };
    minus = (date: Date, unit: DatetimeUnits, count: number): Date => {
        return DateTime.fromJSDate(date)
            .minus({
                [unit]: count,
            })
            .toJSDate();
    };
    resetDateToStart = (date: Date, unit: DatetimeUnit): Date => {
        return DateTime.fromJSDate(date).startOf(unit).toJSDate();
    };
    resetDateToEnd = (date: Date, unit: DatetimeUnit): Date => {
        return DateTime.fromJSDate(date).endOf(unit).toJSDate();
    };
    formatToText = (date: Date, format: FORMATS_DATE): string => {
        return DateTime.fromJSDate(date).toFormat(format);
    };
}

export const datetimeTool = new Datetime();
