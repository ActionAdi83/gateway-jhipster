import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AppLogsComponent } from './app-logs.component';
import { AppLogsDetailComponent } from './app-logs-detail.component';
import { AppLogsUpdateComponent } from './app-logs-update.component';
import { AppLogsDeletePopupComponent, AppLogsDeleteDialogComponent } from './app-logs-delete-dialog.component';
import { appLogsRoute, appLogsPopupRoute } from './app-logs.route';

const ENTITY_STATES = [...appLogsRoute, ...appLogsPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AppLogsComponent,
    AppLogsDetailComponent,
    AppLogsUpdateComponent,
    AppLogsDeleteDialogComponent,
    AppLogsDeletePopupComponent
  ],
  entryComponents: [AppLogsDeleteDialogComponent]
})
export class RestappAppLogsModule {}
