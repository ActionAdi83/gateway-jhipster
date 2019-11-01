import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppLogs } from 'app/shared/model/restapp/app-logs.model';
import { AppLogsService } from './app-logs.service';
import { AppLogsComponent } from './app-logs.component';
import { AppLogsDetailComponent } from './app-logs-detail.component';
import { AppLogsUpdateComponent } from './app-logs-update.component';
import { AppLogsDeletePopupComponent } from './app-logs-delete-dialog.component';
import { IAppLogs } from 'app/shared/model/restapp/app-logs.model';

@Injectable({ providedIn: 'root' })
export class AppLogsResolve implements Resolve<IAppLogs> {
  constructor(private service: AppLogsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppLogs> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AppLogs>) => response.ok),
        map((appLogs: HttpResponse<AppLogs>) => appLogs.body)
      );
    }
    return of(new AppLogs());
  }
}

export const appLogsRoute: Routes = [
  {
    path: '',
    component: AppLogsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppLogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AppLogsDetailComponent,
    resolve: {
      appLogs: AppLogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppLogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AppLogsUpdateComponent,
    resolve: {
      appLogs: AppLogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppLogs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AppLogsUpdateComponent,
    resolve: {
      appLogs: AppLogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppLogs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const appLogsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AppLogsDeletePopupComponent,
    resolve: {
      appLogs: AppLogsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppLogs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
