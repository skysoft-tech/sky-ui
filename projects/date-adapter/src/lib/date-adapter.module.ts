import { NgModule } from '@angular/core';
import { SkyDateAdapter } from './date-adapter';
import { NativeDateAdapter } from './native-date-adapter';

@NgModule({
    providers: [{ provide: SkyDateAdapter, useClass: NativeDateAdapter }],
})
export class SkyDateAdapterModule {}
