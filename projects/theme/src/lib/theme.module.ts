import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppThemeOptions as SkyThemeOptions } from './theme.model';
import { SkyThemeService } from './theme.service';

export const SKY_THEME_OPTIONS = new InjectionToken<SkyThemeOptions>('Nebular Theme Options');

@NgModule({
    imports: [CommonModule],
})
export class SkyThemeModule {
    static forRoot(options: SkyThemeOptions): ModuleWithProviders<SkyThemeModule> {
        return {
            ngModule: SkyThemeModule,
            providers: [{ provide: SKY_THEME_OPTIONS, useValue: options || {} }, SkyThemeService],
        };
    }
}
