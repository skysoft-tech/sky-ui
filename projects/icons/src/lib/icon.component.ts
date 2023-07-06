import { Component, Input, SimpleChanges, OnChanges, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs';
import { SkyIconRegistry } from './icon-registry';

const DefaultEmptyIcon =
    '<svg width="1.5em" height="1.5em" viewBox="0 0 24 24" focusable="false" xmlns="http://www.w3.org/2000/svg"></svg>';

@Component({
    selector: 'sky-icon',
    template: '',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyIconComponent implements OnChanges {
    @Input() src?: string;
    @Input() name?: string;

    @HostBinding('innerHTML')
    svgText?: SafeHtml;

    constructor(private iconRegistry: SkyIconRegistry, private sanitizer: DomSanitizer) {}

    ngOnChanges(changes: SimpleChanges): void {
        console.log('aaaaaaaaaaaaaaa');
        if (changes['src']?.currentValue) {
            this.updateIconWithSrc();
        } else if (changes['name']?.currentValue) {
            this.updateIconWithName();
        } else {
            this.setContent(DefaultEmptyIcon);
        }
    }

    updateIconWithSrc() {
        if (!this.src) {
            return;
        }

        this.iconRegistry
            .getIconFromUrl(this.src)
            .pipe(first())
            .subscribe(s => this.setContent(s));
    }

    updateIconWithName() {
        if (!this.name) {
            return;
        }

        this.iconRegistry
            .getIcon(this.name)
            .pipe(first())
            .subscribe(s => this.setContent(s));
    }

    setContent(icon: string) {
        this.svgText = this.sanitizer.bypassSecurityTrustHtml(icon);
    }
}
