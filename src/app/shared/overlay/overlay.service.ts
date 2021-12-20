import { scan, map, tap, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { IDialog, ILoading, IOverlay } from '@utilities/interfaces/overlay.interface';
import { EAction, ESize } from '@utilities/enums/common.enum';
import { DialogComponent } from './dialog/dialog.component';
import { Logger } from '@nsalaun/ng-logger';

interface DialogAction<T> {
  action: EAction.Add | EAction.Delete | EAction.Clear;
  entity?: IDialog<T>
}

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private injector: Injector,
    private logger: Logger
  ) { }

  private loadingQueue: Subject<ILoading> = new Subject();
  public loadingQueue$: Observable<Set<string>> = this.loadingQueue.asObservable().pipe(
    scan((queue: Set<string>, current: ILoading) => this.resolveLoadingAction(queue, current), new Set())
  );

  private dialogInjectors: Map<string, Injector> = new Map([]);
  private dialogQueue: BehaviorSubject<DialogAction<any>> = new BehaviorSubject(null);
  public dialogQueue$ = this.dialogQueue.asObservable().pipe(
    map(dialog => dialog === null ? new Set() : dialog),
    scan((dialogs: Set<IDialog<any>>, dialog: DialogAction<any>) => this.resolveDialogAction(dialogs, dialog)),
    tap(dialogs => this.dialogs = dialogs)
  );
  public dialogs: Set<IDialog<any>>;

  /**
   * @param backdrop set false to hide backdrop overlay
   * @param  backdropClose set true to enable click backdrop close
   * @param isAside set true to enable aside dialog
   * @default backdrop true
   * @default backdropClose false
   * @default isAside false
   */
  public toggleDialog<T>(component: any, {
    config,
    callbacks = {},
    size = ESize.Middle,
    options
  }: IOverlay<T>) {
    options = { ...{ backdrop: true, backdropClose: false, isAside: false }, ...options };
    this.dialogQueue.next({
      action: EAction.Add,
      entity: {
        component,
        id: new Date().toISOString(),
        params: { config, callbacks, size, options }
      }
    });
  }

  public closeDialog(entity: IDialog<any>) {
    this.dialogQueue.next({ action: EAction.Delete, entity });
  }

  public clearDialog() {
    this.dialogQueue.next({ action: EAction.Clear });
  }

  public getDialogInjector(id: string) {
    return this.dialogInjectors.get(id);
  }

  public startLoading(): string {
    const Config: ILoading = {
      id: new Date().toISOString(),
      action: EAction.Add
    }
    this.loadingQueue.next(Config);
    return Config.id;
  }

  public finishLoading(id: string) {
    this.loadingQueue.next({ id, action: EAction.Delete });
  }

  public forceEndLoading() {
    this.loadingQueue.next({ id: null, action: EAction.Clear });
  }

  private resolveLoadingAction(queue: Set<string>, config: ILoading): Set<string> {
    switch (config.action) {
      case EAction.Add:
        if (!queue.has(config.id)) {
          queue.add(config.id);
        }
        break;
      case EAction.Delete:
        queue.delete(config.id);
        break;
      case EAction.Clear:
        queue.clear();
        break;
    }
    return queue;
  }

  private resolveDialogAction(dialogs: Set<IDialog<any>>, dialog: DialogAction<any>) {
    switch (dialog.action) {
      case EAction.Add:
        if (!dialogs.has(dialog.entity)) {
          this.setDialogInjector(dialog.entity);
          dialogs.add(dialog.entity);
        } else {
          this.logger.warn(`Dialog ${dialog.entity.id} has already exist`);
        }
        break;
      case EAction.Delete:
        if (dialogs.has(dialog.entity)) {
          dialogs.delete(dialog.entity);
          this.dialogInjectors.delete(dialog.entity.id);
        } else {
          this.logger.warn(`Dialog ${dialog.entity.id} not exist`);
        }
        break;
      case EAction.Clear: dialogs.clear(); break;
    }
    return dialogs;
  }

  private setDialogInjector(dialog: IDialog<any>) {
    this.dialogInjectors.set(dialog.id, Injector.create({
      providers: [{
        provide: DialogComponent,
        useValue: dialog
      }],
      parent: this.injector
    }));
  }


}
