import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IAppLogs } from 'app/shared/model/restapp/app-logs.model';
import { AccountService } from 'app/core/auth/account.service';
import { AppLogsService } from './app-logs.service';

@Component({
  selector: 'jhi-app-logs',
  templateUrl: './app-logs.component.html'
})
export class AppLogsComponent implements OnInit, OnDestroy {
  appLogs: IAppLogs[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected appLogsService: AppLogsService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.appLogsService
      .query()
      .pipe(
        filter((res: HttpResponse<IAppLogs[]>) => res.ok),
        map((res: HttpResponse<IAppLogs[]>) => res.body)
      )
      .subscribe((res: IAppLogs[]) => {
        this.appLogs = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAppLogs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAppLogs) {
    return item.id;
  }

  registerChangeInAppLogs() {
    this.eventSubscriber = this.eventManager.subscribe('appLogsListModification', response => this.loadAll());
  }
}
