import { Observable, of } from 'rxjs';

/**
 * Allow to specify error messages for the input
 * Can be used for error messages localization
 * Sync variant of the AsyncFieldErrorMessageService - use in case translation is already loaded
 */
export abstract class FieldErrorMessageService {
    /**
     * Provide error message for failed validator
     * @param fieldName Name of the corresponding control provided in [formControlName] attribute
     * @param failedValidator One of the failed validators for the current form control
     * @param values Additional parameters
     * @returns Error string
     */
    abstract getErrorMessage(fieldName: string | null, failedValidator: string, values: unknown): string;
}

/**
 * Allow to specify error messages for the input with async api
 * Can be used for error messages localization
 */
export abstract class AsyncFieldErrorMessageService {
    /**
     * Provide error message for failed validator
     * @param fieldName Name of the corresponding control provided in [formControlName] attribute
     * @param failedValidator One of the failed validators for the current form control
     * @param values Additional parameters
     * @returns Observable with error string
     */
    abstract getErrorMessage(fieldName: string | null, failedValidator: string, values: unknown): Observable<string>;
}

/**
 * Default message service that specify general error
 */
export class SimpleFieldErrorMessage extends AsyncFieldErrorMessageService {
    getErrorMessage(fieldName: string | null, failedValidator: string, values: unknown): Observable<string> {
        const displayname = this.getFieldDisplayName(fieldName ?? 'Field');

        switch (failedValidator) {
            case 'required':
                return of(`${displayname} is required`);
            case 'requireLowerLetter':
                return of(`${displayname} must contain lower case letters`);
            case 'requireUpperLetter':
                return of(`${displayname}  must contain upper case letters`);
            case 'requireNumber':
                return of(`${displayname} must contain at least one number`);
            case 'requireSymbol':
                return of(`${displayname} must contain at least one symbol`);
            case 'minlength':
                return of(`${displayname} must contain at least 8 characters`);
            default:
                return of(`Invalid field`);
        }
    }

    private getFieldDisplayName(fieldName: string): string {
        return this.capitalizeFirstLetter(fieldName);
    }

    private capitalizeFirstLetter(input: string): string {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
}
