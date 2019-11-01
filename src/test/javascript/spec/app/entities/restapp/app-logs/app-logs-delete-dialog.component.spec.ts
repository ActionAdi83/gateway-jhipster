import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { AppLogsDeleteDialogComponent } from 'app/entities/restapp/app-logs/app-logs-delete-dialog.component';
import { AppLogsService } from 'app/entities/restapp/app-logs/app-logs.service';

describe('Component Tests', () => {
  describe('AppLogs Management Delete Component', () => {
    let comp: AppLogsDeleteDialogComponent;
    let fixture: ComponentFixture<AppLogsDeleteDialogComponent>;
    let service: AppLogsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AppLogsDeleteDialogComponent]
      })
        .overrideTemplate(AppLogsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppLogsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppLogsService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
