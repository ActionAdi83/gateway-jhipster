import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAppLogs, AppLogs } from 'app/shared/model/restapp/app-logs.model';
import { AppLogsService } from './app-logs.service';

@Component({
  selector: 'jhi-app-logs-update',
  templateUrl: './app-logs-update.component.html'
})
export class AppLogsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    logId: [],
    entryDate: [],
    logger: [],
    logLevel: [],
    message: [],
    username: [],
    aplicatie: [],
    cod: [],
    tip: []
  });

  constructor(protected appLogsService: AppLogsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appLogs }) => {
      this.updateForm(appLogs);
    });
  }

  updateForm(appLogs: IAppLogs) {
    this.editForm.patchValue({
      id: appLogs.id,
      logId: appLogs.logId,
      entryDate: appLogs.entryDate != null ? appLogs.entryDate.format(DATE_TIME_FORMAT) : null,
      logger: appLogs.logger,
      logLevel: appLogs.logLevel,
      message: appLogs.message,
      username: appLogs.username,
      aplicatie: appLogs.aplicatie,
      cod: appLogs.cod,
      tip: appLogs.tip
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appLogs = this.createFromForm();
    if (appLogs.id !== undefined) {
      this.subscribeToSaveResponse(this.appLogsService.update(appLogs));
    } else {
      this.subscribeToSaveResponse(this.appLogsService.create(appLogs));
    }
  }

  private createFromForm(): IAppLogs {
    return {
      ...new AppLogs(),
      id: this.editForm.get(['id']).value,
      logId: this.editForm.get(['logId']).value,
      entryDate:
        this.editForm.get(['entryDate']).value != null ? moment(this.editForm.get(['entryDate']).value, DATE_TIME_FORMAT) : undefined,
      logger: this.editForm.get(['logger']).value,
      logLevel: this.editForm.get(['logLevel']).value,
      message: this.editForm.get(['message']).value,
      username: this.editForm.get(['username']).value,
      aplicatie: this.editForm.get(['aplicatie']).value,
      cod: this.editForm.get(['cod']).value,
      tip: this.editForm.get(['tip']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppLogs>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
