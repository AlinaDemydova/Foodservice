import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { Subject } from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CartService {
  cartSubject = new Subject<number>();
  productsInCart: Meal[];
  public quantitySum: number;
  constructor() { }

  getQuantity(): Observable<any> {
    return this.cartSubject.asObservable();
}

  getItemsFromLocalStorage(): Meal[]  {
    const productsInCart = JSON.parse(localStorage.getItem('mealsInCart'));
    return productsInCart;
  }

  calculateFirstSum(prodsInCart): Meal[] {
    prodsInCart.forEach(x => x.totalItem = x.price * x.quantity);
    return prodsInCart;
  }

  calculateTotal(prodsInCart): any {
    let total = 0;
    prodsInCart.map(x => total += x.price * x.quantity);
    if (prodsInCart) {
      localStorage.setItem('mealsInCart', JSON.stringify(prodsInCart));
    }
    return [total, prodsInCart];
  }

  countQuantity(prodsInCart): any {
    let quantitySum = 0;
    prodsInCart.forEach(x => quantitySum += x.quantity);
    return [quantitySum, prodsInCart];
  }

}
