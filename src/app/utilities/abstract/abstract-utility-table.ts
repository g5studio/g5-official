import { Injectable } from '@angular/core';
import { OrderByType } from '@esop/shared/models/graphql-esop-backend';
import { PaginationController } from '@shared/tables/tables.model';
import { UnsubOndestroy } from './unsub-ondestroy';

@Injectable()
export abstract class UtilityTableController<T> extends UnsubOndestroy {
  constructor() {
    super();
  }

  get orderType(): typeof OrderByType { return OrderByType; }

  public pageController: PaginationController = new PaginationController();
  public sorting;
  public filter;
  protected abstract getData();

  public refetch() {
    this.pageController.current = 1;
    this.getData();
  }

  public getIsEnabled(orderType: OrderByType, sortType: T) {
    return this.sorting.orderBy === orderType && this.sorting.sortingType === sortType;
  }

  public setSort(sortingType: T) {
    if (this.sorting.sortingType === sortingType) {
      this.sorting.orderBy = this.sorting.orderBy === OrderByType.Ascending ?
        OrderByType.Descending : this.sorting.orderBy === OrderByType.Descending ?
          null : OrderByType.Ascending;
    } else {
      this.sorting.sortingType = sortingType;
      this.sorting.orderBy = OrderByType.Ascending;
    }
    this.refetch();
  }

  public setPer(perPageCount: number) {
    this.pageController.setPer(perPageCount);
    this.refetch();
  }

  public setPage(page: number) {
    this.pageController.current = page;
    this.getData();
  }

}
