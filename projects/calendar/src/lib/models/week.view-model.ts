import { SkyDay } from './day.view-model';

export class SkyWeek {
    constructor(public year: number, public months: number) {}

    public days: SkyDay[] = [];
}
