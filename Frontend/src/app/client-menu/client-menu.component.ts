import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Meal } from '../models/meal.model';
import { Subscription } from 'rxjs';
import defaultConfig from '../../../config/default';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss']
})
export class ClientMenuComponent implements OnInit, OnDestroy {
  defConfig = defaultConfig;
  meals: Meal[] = [];
  meal: Meal;
  private mealsSub: Subscription;

  constructor(public mealService: MealService) { }

  ngOnInit() {
    this.mealService.getMeals(this.defConfig.clientMenuURI);

    this.mealsSub = this.mealService.getMealUpdateListener()
      .subscribe((meals: Meal[]) => {
        this.meals = meals;
      });
  }
  ngOnDestroy() {
    this.mealsSub.unsubscribe();
  }

}
