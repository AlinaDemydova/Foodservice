import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal.model';
import { Subscription } from 'rxjs';
import { LocStorageCart } from '../client-cart/localStorage';
import { CartService } from '../services/cart.service';
import defaultConfig from '../../../config/default';

@Component({
  selector: 'app-client-menu-item',
  templateUrl: './client-menu-item.component.html',
  styleUrls: ['./client-menu-item.component.scss']
})
export class ClientMenuItemComponent implements OnInit {

  defConfig = defaultConfig;
  myId = this.route.snapshot.paramMap.get('id');
  public locStorageCart = LocStorageCart;
  meals: Meal[] = [];
  meal: Meal;
  inCart: boolean = false;
  quantitySum: number;
  productsInCart: Meal[];
  private mealsSub: Subscription;

  constructor(
    public cartService: CartService,
    public mealService: MealService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.inCart = this.locStorageCart.checkIsInLS(this.myId, this.defConfig.lStorageCartName);
    this.mealService.getMeals(this.defConfig.clientMenuURI);
    this.mealsSub = this.mealService.getMealUpdateListener()
      .subscribe((meals: Meal[]) => {
        this.meals = meals;
      });
  }

  countQuantity(): void {
    this.productsInCart = JSON.parse(localStorage.getItem(this.defConfig.lStorageCartName));
    [this.quantitySum, this.productsInCart] = this.cartService.countQuantity(this.productsInCart);
  }
  addToCart(meal, localStorageName) {
    this.locStorageCart.addItemToLS(meal, localStorageName);
    this.inCart = this.locStorageCart.checkIsInLS(this.myId, localStorageName);
    this.countQuantity();
    this.cartService.cartSubject.next(this.quantitySum);

  }

}
