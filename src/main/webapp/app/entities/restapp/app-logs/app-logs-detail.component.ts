import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppLogs } from 'app/shared/model/restapp/app-logs.model';

@Component({
  selector: 'jhi-app-logs-detail',
  templateUrl: './app-logs-detail.component.html'
})
export class AppLogsDetailComponent implements OnInit {
  appLogs: IAppLogs;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appLogs }) => {
      this.appLogs = appLogs;
    });
  }

  previousState() {
    window.history.back();
  }
}
