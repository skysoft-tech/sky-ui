import { SkyWeek } from './week.view-model';

export class SkyMonth {
    constructor(public date: Date) {}

    public weeks: SkyWeek[] = [];
}
