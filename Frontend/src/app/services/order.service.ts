import { Order } from '../models/order.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private order: Order;
  private ordersUpdated = new Subject<Order[]>();
  private orderUpdated = new Subject<Order['status']>();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  addOrder(
    listitems: string,
    customername: string,
    customerphone: string,
    paymethod: string,
    totalquantity: number,
    totalprice: number
    ) {
    const order: Order = {
      id: null,
      listItems: listitems,
      customerName: customername,
      customerPhone: customerphone,
      orderBirth: null,
      status: 'UNPROCESSED',
      commandButton: 'TAKE IN PROGRESS',
      pay: paymethod,
      totalQuantity: totalquantity,
      totalPrice: totalprice
    };
    console.log(order);
    this.http.post<{message: string, orderId: string}>('http://localhost:3000/client/cart', order)
      .subscribe(responseData => {
          const id = responseData.orderId;
          order.id = id;
          this.orders.push(order);
          this.ordersUpdated.next([...this.orders]);
      });
  }
  getOrders(nameUri) {
    this.http.get<{message: string; orders: any}>(
      'http://localhost:3000' + nameUri)
      .pipe(map(orderData => {
        return orderData.orders.map(order => {
            return {
              id: order._id,
              listItems: order.listItems,
              customerName: order.customerName,
              customerPhone: order.customerPhone,
              orderBirth: order.orderBirth,
              status: order.status,
              commandButton: order.commandButton,
              pay: order.pay,
              totalQuantity: order.totalQuantity,
              totalPrice: order.totalPrice
            };
        });
      }))
      .subscribe((transformedOrders) => {
        this.orders = transformedOrders;
        this.ordersUpdated.next([...this.orders]);
      });
  }

  updateOrder(
    orderId: string,
    orderListItems: any,
    orderCustomerName: string,
    orderCustomerPhone: string,
    ordersBirth: string,
    orderStatus: string,
    orderCommandButton: string,
    orderPay: string,
    orderTotalQuantity: number,
    orderTotalPrice: number,
    nameUri: string) {
    const order: Order = {
      id: orderId,
      listItems: orderListItems,
      customerName: orderCustomerName,
      customerPhone: orderCustomerPhone,
      orderBirth: ordersBirth,
      status: orderStatus,
      commandButton: orderCommandButton,
      pay: orderPay,
      totalQuantity: orderTotalQuantity,
      totalPrice: orderTotalPrice };
    this.http
      .put('http://localhost:3000' + nameUri + orderId, order)
      .subscribe(response => {
        const updatedOrders = [...this.orders];
        this.orders = updatedOrders;
        this.ordersUpdated.next([...this.orders]);
        // this.router.navigate([nameUri]);
      });
  }

  deleteOrder(orderId: string, nameUri: string) {
    this.http
      .delete('http://localhost:3000' + nameUri + orderId)
      .subscribe(() => {
        const updatedOrders = this.orders.filter(order => order.id !== orderId);
        this.orders = updatedOrders;
        this.ordersUpdated.next([...this.orders]);
      });
  }

  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }
  getOrderUpdateListener() {
    return this.orderUpdated.asObservable();
  }
  getOneOrder(id: string, nameUri: string) {
    return this.http.get<{
      _id: string;
      listItems: string;
      customerName: string;
      customerPhone: string;
      orderBirth: string;
      status: string;
      commandButton: string;
      pay: string;
      totalQuantity: number;
      totalPrice: number;
    }>('http://localhost:3000' + nameUri + id)
  }


}
