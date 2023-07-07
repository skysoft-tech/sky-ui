import { Injectable, Inject, Optional } from '@angular/core';
import { Ranges, SUPORTED_RANGES } from '../models/special-dates.model';
import { ColorMixer, Hex } from '@sky-ui/core';
import { DEFAULT_RANGES } from '../constants';

@Injectable()
export class RangeColorService {
    constructor(@Optional() @Inject(SUPORTED_RANGES) private ranges: Ranges) {
        if (!ranges) {
            this.ranges = DEFAULT_RANGES;
        }
    }

    public mixColorArray(colors: Hex[]): Hex {
        return ColorMixer.mixArray(colors);
    }

    public getColorByType(rangesNames: string[]): Hex[] {
        return rangesNames.map((r: string) => this.ranges[r] ?? this.ranges['default']);
    }
}
