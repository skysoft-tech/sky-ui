import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { StylesLoaderService } from './styles-loader.service';
import { AppThemeOptions } from './theme.model';
import { SKY_THEME_OPTIONS } from './theme.module';

type ThemeChangedEventArgs = { name: string; previous: string };

@Injectable()
export class SkyThemeService {
    public currentTheme: BehaviorSubject<string> = new BehaviorSubject<string>('none');

    public themeChanged: Subject<ThemeChangedEventArgs> = new Subject<ThemeChangedEventArgs>();

    constructor(
        @Inject(SKY_THEME_OPTIONS)
        protected options: AppThemeOptions,
        protected loader: StylesLoaderService
    ) {
        this.changeTheme(this.options.defaultTheme);
    }

    changeTheme(themeName: string): Observable<ThemeChangedEventArgs> {
        const oldValue = this.currentTheme.value;

        this.currentTheme.next(themeName);

        this.loader.loadStyle(`${themeName}.theme.css`).then(() => {
            // trigger theme changed event once styles are loaded
            this.themeChanged.next({ name: themeName, previous: oldValue });
        });

        return this.themeChanged.asObservable();
    }
}
