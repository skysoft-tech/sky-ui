import { TestBed } from '@angular/core/testing';

import { SkyDialogService } from './dialog.service';

describe('DialogService', () => {
    let service: SkyDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SkyDialogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
