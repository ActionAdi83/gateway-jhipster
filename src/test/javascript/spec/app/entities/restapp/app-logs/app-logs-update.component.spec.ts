import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AppLogsUpdateComponent } from 'app/entities/restapp/app-logs/app-logs-update.component';
import { AppLogsService } from 'app/entities/restapp/app-logs/app-logs.service';
import { AppLogs } from 'app/shared/model/restapp/app-logs.model';

describe('Component Tests', () => {
  describe('AppLogs Management Update Component', () => {
    let comp: AppLogsUpdateComponent;
    let fixture: ComponentFixture<AppLogsUpdateComponent>;
    let service: AppLogsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AppLogsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AppLogsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppLogsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppLogsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppLogs(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppLogs();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
