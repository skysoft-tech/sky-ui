import { Injectable } from '@angular/core';
import { SkyDay } from '../models/day.view-model';
import { SkyMonth } from '../models/month.view-model';
import { SkyWeek } from '../models/week.view-model';
import { DAYS_IN_WEEK, SkyDateAdapter } from '@sky-ui/date-adapter';

export const CALENDAR_ROWS_COUNT = 6;

@Injectable()
export class SheetService {
    private selectedMonth: number | null = null;
    private selectedYear: number | null = null;
    private currentSheet: SkyMonth | null = null;

    constructor(private readonly dataAdapter: SkyDateAdapter<Date>) {}

    generateDaysSheet(date: Date): SkyMonth {
        const selectedYear = date.getFullYear();
        const selectedMonth = date.getMonth();
        if (this.selectedYear == selectedYear && this.selectedMonth == selectedMonth && this.currentSheet != null) {
            return this.currentSheet;
        }

        const monthViewModel: SkyMonth = new SkyMonth(date);

        const firstDayOffset = this.dataAdapter.getMonthFirstDayOffset(selectedYear, selectedMonth);
        const monthDaysCount = this.dataAdapter.getNumDaysInMonth(date);

        for (let rowIndex = 0; rowIndex < CALENDAR_ROWS_COUNT; rowIndex++) {
            const weekViewModel: SkyWeek = new SkyWeek(selectedYear, selectedMonth);

            for (let colIndex = 0; colIndex < DAYS_IN_WEEK; colIndex++) {
                const day = rowIndex * DAYS_IN_WEEK + colIndex - firstDayOffset + 1;

                const isNextMonthDay = day > monthDaysCount;
                const isPrevMonthDay = day <= 0;

                const date = new Date(selectedYear, selectedMonth, day);
                const dayViewModel = new SkyDay(date, isPrevMonthDay, isNextMonthDay, true);
                weekViewModel.days.push(dayViewModel);
            }

            monthViewModel.weeks.push(weekViewModel);
        }

        this.currentSheet = monthViewModel;
        return this.currentSheet;
    }
}
