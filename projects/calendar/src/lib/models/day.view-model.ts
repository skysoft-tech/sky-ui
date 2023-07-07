export class SkyDay {
    public get number(): number {
        return this.date.getDate();
    }

    constructor(
        public date: Date,
        public isPrevMonthDay: boolean,
        public isNextMonthDay: boolean,
        public isEnabled: boolean
    ) {}
}
