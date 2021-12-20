
import { LoggerService } from '@shared/services/logger.service';
import { IEvent } from '@utilities/interfaces/common.interface';

/**
 * @param T service event type
 */
export abstract class FeatureService<Event extends IEvent<Action>, Action> {

  constructor(
    protected logger: LoggerService
  ) { }

  /**
   * @description show on debug message
   */
  protected abstract featureName: string;

  /**
   * @description resolve feature service event and do event handler
   * @param event feature event
   */
  protected abstract resolveAction(event: Event): Promise<any>;

  public fireEvent<T>(event: Event): Promise<T> {
    this.logger.debugMessage(`${this.featureName} event ${event.action} has triggered.`);
    return this.resolveAction(event).then(result => result);
  }


}
