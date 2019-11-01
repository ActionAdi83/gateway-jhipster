import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppLogs } from 'app/shared/model/restapp/app-logs.model';

type EntityResponseType = HttpResponse<IAppLogs>;
type EntityArrayResponseType = HttpResponse<IAppLogs[]>;

@Injectable({ providedIn: 'root' })
export class AppLogsService {
  public resourceUrl = SERVER_API_URL + 'services/restapp/api/app-logs';

  constructor(protected http: HttpClient) {}

  create(appLogs: IAppLogs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appLogs);
    return this.http
      .post<IAppLogs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(appLogs: IAppLogs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(appLogs);
    return this.http
      .put<IAppLogs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAppLogs>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppLogs[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(appLogs: IAppLogs): IAppLogs {
    const copy: IAppLogs = Object.assign({}, appLogs, {
      entryDate: appLogs.entryDate != null && appLogs.entryDate.isValid() ? appLogs.entryDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.entryDate = res.body.entryDate != null ? moment(res.body.entryDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((appLogs: IAppLogs) => {
        appLogs.entryDate = appLogs.entryDate != null ? moment(appLogs.entryDate) : null;
      });
    }
    return res;
  }
}
