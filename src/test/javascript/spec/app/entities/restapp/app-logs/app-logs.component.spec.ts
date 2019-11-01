import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { AppLogsComponent } from 'app/entities/restapp/app-logs/app-logs.component';
import { AppLogsService } from 'app/entities/restapp/app-logs/app-logs.service';
import { AppLogs } from 'app/shared/model/restapp/app-logs.model';

describe('Component Tests', () => {
  describe('AppLogs Management Component', () => {
    let comp: AppLogsComponent;
    let fixture: ComponentFixture<AppLogsComponent>;
    let service: AppLogsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AppLogsComponent],
        providers: []
      })
        .overrideTemplate(AppLogsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppLogsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppLogsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AppLogs(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.appLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
