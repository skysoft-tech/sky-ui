import { coerceBooleanProperty } from './tools';

export interface CanDisable {
    disabled: boolean;
}

export class BaseDisabled implements CanDisable {
    private _disabled: boolean = false;

    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: any) {
        this._disabled = coerceBooleanProperty(value);
    }
}
