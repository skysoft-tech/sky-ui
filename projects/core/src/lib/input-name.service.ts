import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class SkyInputNameController {
    public checkName(
        controlName: string | number | undefined | null,
        template: ElementRef<HTMLElement> | undefined | null,
        inputElement: ElementRef<HTMLInputElement> | undefined | null
    ): void {
        if (!template || !inputElement) {
            return;
        }

        let label = this.getLabel(template);
        let input = inputElement.nativeElement;

        if (!label) {
            return;
        }

        if (!!label.htmlFor && label.htmlFor !== input.id) {
            console.warn('Label is not linked with input');
            return;
        }

        if (!!label.htmlFor && label.htmlFor === input.id) {
            return;
        }

        if (!controlName) {
            console.warn('Label and input are not linked');
            return;
        }

        label.htmlFor = controlName.toString();
        input.id = controlName.toString();
        input.name = controlName.toString();
    }

    private getLabel(template: ElementRef<HTMLElement>): HTMLLabelElement | null {
        return template.nativeElement.querySelector('label');
    }
}
