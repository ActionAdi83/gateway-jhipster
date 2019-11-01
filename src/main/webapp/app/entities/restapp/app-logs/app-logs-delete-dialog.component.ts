import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppLogs } from 'app/shared/model/restapp/app-logs.model';
import { AppLogsService } from './app-logs.service';

@Component({
  selector: 'jhi-app-logs-delete-dialog',
  templateUrl: './app-logs-delete-dialog.component.html'
})
export class AppLogsDeleteDialogComponent {
  appLogs: IAppLogs;

  constructor(protected appLogsService: AppLogsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appLogsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'appLogsListModification',
        content: 'Deleted an appLogs'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-app-logs-delete-popup',
  template: ''
})
export class AppLogsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appLogs }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AppLogsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.appLogs = appLogs;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/app-logs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/app-logs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
