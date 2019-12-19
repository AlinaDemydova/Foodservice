import { Component, OnInit } from '@angular/core';
import { LocStorageCart } from './localStorage';
import { Meal } from '../models/meal.model';
import { CartService } from '../services/cart.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import defaultConfig from '../../../config/default';

@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.scss']
})
export class ClientCartComponent implements OnInit {
  defConfig = defaultConfig;
  selectedPay: string;
  pays: any = this.defConfig.payMethods;
  isNone: boolean;
  ngClass: any;
  productsInCart: Meal[];
  total: number;
  public quantitySum: number;
  public locStorageCart = LocStorageCart;

  constructor(
    public orderService: OrderService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isNone = true;
    // console.log(localStorage.getItem(this.defConfig.lStorageCartName)); // str
    // console.log(JSON.parse(localStorage.getItem(this.defConfig.lStorageCartName))); // obj
    this.getItemsFromLocalStorage();
    this.calculateFirstSum();
    this.calculateTotal();
    this.countQuantity();

  }
  createOrderForm() {
    this.isNone = false;
  }
  radioChangeHandler(event: any) {
    this.selectedPay = event.target.value;
  }
  clearCart() {
    let lostor = JSON.parse(localStorage.getItem(this.defConfig.lStorageCartName));
    console.log(lostor);
    lostor = [];
  }
  onSaveOrder(form: NgForm) {
    if (form.invalid) { return; }
    this.orderService.addOrder(
      JSON.parse(localStorage.getItem(this.defConfig.lStorageCartName)),
      form.value.customername,
      form.value.customerphone,
      this.selectedPay,
      this.quantitySum,
      this.total);
    form.resetForm();
    this.isNone = true;
    this.productsInCart.forEach(x => x.quantity = 0);
    this.countQuantity();
    localStorage.clear();
    this.router.navigateByUrl('/client/menu');
  }

  calculateFirstSum(): void {
    this.productsInCart = this.cartService.calculateFirstSum(this.productsInCart);
  }

  getItemsFromLocalStorage() {
    this.productsInCart = JSON.parse(localStorage.getItem(this.defConfig.lStorageCartName));
  }

  calculateTotal(): void {
    [this.total, this.productsInCart] = this.cartService.calculateTotal(this.productsInCart);
    this.countQuantity();
  }

  countQuantity(): void {
    [this.quantitySum, this.productsInCart] = this.cartService.countQuantity(this.productsInCart);
    this.cartService.cartSubject.next(this.quantitySum);
  }

  addOne(id: string) {
    const result = this.productsInCart.find(x => x.id === id);
    if (result) { result.quantity += 1; }
    this.calculateFirstSum();
    this.calculateTotal();
  }

  removeOne(id: string) {
    const result = this.productsInCart.find(x => x.id === id);
    if (result) {
      result.quantity > 1 ? result.quantity -= 1 :  result.quantity = 1;
    }
    this.calculateFirstSum();
    this.calculateTotal();
  }

  deleteProduct(itemId, localStorageName) {
    this.locStorageCart.removeFromLS(itemId, localStorageName);
    this.getItemsFromLocalStorage();
    this.calculateFirstSum();
    this.calculateTotal();
  }
}
