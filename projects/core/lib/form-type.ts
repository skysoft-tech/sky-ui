import { FormControl } from '@angular/forms';

export type FormType<T> = {
    [P in keyof T]: FormControl<T[P]>;
};
