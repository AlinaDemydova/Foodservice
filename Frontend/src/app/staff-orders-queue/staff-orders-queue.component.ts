import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import defaultConfig from '../../../config/default';

@Component({
  selector: 'app-staff-orders-queue',
  templateUrl: './staff-orders-queue.component.html',
  styleUrls: ['./staff-orders-queue.component.scss']
})
export class StaffOrdersQueueComponent implements OnInit, OnDestroy {
  defConfig = defaultConfig;
  isColumn: boolean;
  orders: Order [] = [];
  order: Order;
  private ordersSub: Subscription;

  oldestFirst: boolean;
  unprocessed: boolean;
  inProgress: boolean;
  done: boolean;

  constructor(
    private datePipe: DatePipe,
    public orderService: OrderService) { }

  ngOnInit() {
    this.isColumn = true;
    this.orderService.getOrders(this.defConfig.staffOrdersQueueURI);

    this.ordersSub = this.orderService.getOrdersUpdateListener()
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      });
  }

  sortedOrders() {
    this.oldestFirst ? this.isColumn = false : this.isColumn = true;
    const unprocessed = this.unprocessed ? 'UNPROCESSED' : null;
    const inProgress = this.inProgress ? 'IN PROGRESS' : null;
    const done = this.done ? 'DONE' : null;
    const allOrdeers = this.orders;
    if (unprocessed || inProgress || done) {
      this.orders = allOrdeers
        .filter( current => current.status === unprocessed ||
          current.status === inProgress || current.status === done );
    } else {
      this.orderService.getOrders(this.defConfig.staffOrdersQueueURI);
    }
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'HH-mm' + ' ' + 'dd-MMM-yyyy');
  }
  onDelete(orderId: string) {
    this.orderService.deleteOrder(orderId, this.defConfig.staffOrdersQueueURI);
  }
  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
