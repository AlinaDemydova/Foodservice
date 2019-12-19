import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import defaultConfig from '../../../config/default';

@Component({
  selector: 'app-staff-orders-queue-item',
  templateUrl: './staff-orders-queue-item.component.html',
  styleUrls: ['./staff-orders-queue-item.component.scss']
})
export class StaffOrdersQueueItemComponent implements OnInit {
  defConfig = defaultConfig;
  orders: Order [] = [];
  order: Order;
  currentId: string;
  private ordersSub: Subscription;
  private orderSub: Subscription;

  constructor(
    private datePipe: DatePipe,
    public orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentId = this.route.snapshot.paramMap.get('id');

    this.orderService.getOneOrder(this.currentId, this.defConfig.staffOrdersQueueURI)
      .subscribe(orderData => {
      this.order = {
        id: orderData._id,
        listItems: orderData.listItems,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        orderBirth: orderData.orderBirth,
        status: orderData.status,
        commandButton: orderData.commandButton,
        pay: orderData.pay,
        totalQuantity: orderData.totalQuantity,
        totalPrice: orderData.totalPrice
      };
    });
    this.orderSub = this.orderService.getOrderUpdateListener()
      .subscribe(order => {
        this.order.status = order;
      });
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'HH-mm' + ' ' + 'dd-MMM-yyyy');
  }

  changeStatus(order: any) {
    if (order.status === 'UNPROCESSED') {
      this.orderService.updateOrder(
        this.currentId,
        order.listItems,
        order.customerName,
        order.customerPhone,
        order.orderBirth,
        'IN PROGRESS',
        'DONE',
        order.pay,
        order.totalQuantity,
        order.totalPrice,
        this.defConfig.staffOrdersQueueURI);
    }
    if (order.status === 'IN PROGRESS') {
      this.orderService.updateOrder(
        this.currentId,
        order.listItems,
        order.customerName,
        order.customerPhone,
        order.orderBirth,
        'DONE',
        'CLOSE',
        order.pay,
        order.totalQuantity,
        order.totalPrice,
        this.defConfig.staffOrdersQueueURI);
    }
    if (order.status === 'DONE') {
      this.orderService.updateOrder(
        this.currentId,
        order.listItems,
        order.customerName,
        order.customerPhone,
        order.orderBirth,
        'CLOSED',
        'X',
        order.pay,
        order.totalQuantity,
        order.totalPrice,
        this.defConfig.staffOrdersQueueURI);
    }

  }

}
