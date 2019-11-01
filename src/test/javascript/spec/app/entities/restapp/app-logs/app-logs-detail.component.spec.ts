import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AppLogsDetailComponent } from 'app/entities/restapp/app-logs/app-logs-detail.component';
import { AppLogs } from 'app/shared/model/restapp/app-logs.model';

describe('Component Tests', () => {
  describe('AppLogs Management Detail Component', () => {
    let comp: AppLogsDetailComponent;
    let fixture: ComponentFixture<AppLogsDetailComponent>;
    const route = ({ data: of({ appLogs: new AppLogs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AppLogsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AppLogsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppLogsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appLogs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
