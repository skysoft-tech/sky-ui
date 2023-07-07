import { Injectable } from '@angular/core';
import { SkyDayOfWeek } from '../models/days-of-week.enum';
import { SkyDateAdapter } from '@sky-ui/date-adapter';

/**
 * Number of seconds in one week
 */
export const SECONDS_IN_WEEK = 604800;

/**
 * Number of miliseconds in one week
 */
export const MILLISECONDS_IN_WEEK = SECONDS_IN_WEEK * 1000;

/**
 * Default years offset
 */
export const DEFAULT_YEARS_OFFSET = 100;

@Injectable()
export class CalendarViewRangeService {
    /**
     * Number of years that will be shifted on both sides from the current date
     */
    public readonly yearsOffset: number = DEFAULT_YEARS_OFFSET;

    /**
     * The year that was yearOffset ago, from the current year
     */
    public readonly startYear: number;

    /**
     * The year that will be after yearOffset, from the current year
     */
    public readonly endYear: number;

    public get currentDate(): Date {
        return new Date();
    }

    /**
     * The first January of startYear
     */
    public get startDate(): Date {
        return this.dateAdapter.createDate(this.startYear, 0, 1);
    }

    /**
     * The thirty-one December of lastYear
     */
    public get endDate(): Date {
        return this.dateAdapter.createDate(this.endYear, 11, 31);
    }

    constructor(private dateAdapter: SkyDateAdapter<Date, string, SkyDayOfWeek>) {
        const currentYear = dateAdapter.getYear(this.currentDate);

        this.startYear = currentYear - this.yearsOffset;
        this.endYear = currentYear + this.yearsOffset;
    }

    /**
     * @param date - The date from which will get the week number
     * @returns {number} The number of week of the date in the range
     */
    public getNumberOfWeek(date: Date): number {
        const calcResult = (date.getTime() - this.startDate.getTime()) / MILLISECONDS_IN_WEEK;
        return Math.floor(calcResult);
    }

    /**
     * @returns {number} The number of weeks in the specified range
     */
    public getNumberOfWeeks(): number {
        return Math.floor((this.endDate.getTime() - this.startDate.getTime()) / MILLISECONDS_IN_WEEK);
    }

    /**
     * @param index The index of week in specified period
     * @returns {Date} The Date in week on specified index
     */
    public getDateByWeekIndex(index: number): Date {
        const date = new Date(this.startDate.getTime() + index * MILLISECONDS_IN_WEEK);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }
}
