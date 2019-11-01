import { Moment } from 'moment';

export interface IAppLogs {
  id?: number;
  logId?: string;
  entryDate?: Moment;
  logger?: string;
  logLevel?: string;
  message?: string;
  username?: string;
  aplicatie?: string;
  cod?: string;
  tip?: string;
}

export class AppLogs implements IAppLogs {
  constructor(
    public id?: number,
    public logId?: string,
    public entryDate?: Moment,
    public logger?: string,
    public logLevel?: string,
    public message?: string,
    public username?: string,
    public aplicatie?: string,
    public cod?: string,
    public tip?: string
  ) {}
}
