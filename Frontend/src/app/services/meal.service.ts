import { Meal } from '../models/meal.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import defaultConfig from '../../../config/default';

@Injectable({providedIn: 'root'})

export class MealService {
  defConfig = defaultConfig;
  private meals: Meal[] = [];
  private mealsUpdated = new Subject<Meal[]>();

  currentMeal: Meal;
  constructor(private http: HttpClient, private router: Router) {}

  getMeals(nameUri: string) {
    this.http.get<{message: string; meals: any}>(
      'http://localhost:3000' + nameUri)
      .pipe(map(mealData => {
        return mealData.meals.map(meal => {
            return {
              id: meal._id,
              name: meal.name,
              description: meal.description,
              ingredientsList: meal.ingredientsList,
              weight: meal.weight,
              price: meal.price,
              quantity: meal.quantity,
              imagePath: meal.imagePath
            };
        });
      }))
      .subscribe((transformedMeals) => {
        this.meals = transformedMeals;
        this.mealsUpdated.next([...this.meals]);
      });
  }
  getOneMeal(id: string, nameUri: string) {
    return this.http.get<{
      _id: string;
      name: string;
      description: string;
      ingredientsList: string;
      weight: number;
      price: number;
      quantity: number;
      imagePath: string}>('http://localhost:3000' + nameUri + id);
  }
  getMealUpdateListener() {
    return this.mealsUpdated.asObservable();
  }
  addMeal(
    name: string,
    description: string,
    ingredientsList: string,
    weight: number,
    price: number,
    quantity: number,
    image: File,
    nameUri: string) {
      const mealData = new FormData();
      mealData.append('name', name);
      mealData.append('description', description);
      mealData.append('ingredientsList', ingredientsList);
      mealData.append('weight', JSON.stringify(weight));
      mealData.append('price', JSON.stringify(price));
      mealData.append('quantity', JSON.stringify(quantity));
      mealData.append('image', image, name);

      this.http.post<{message: string, meal: Meal}>('http://localhost:3000' + nameUri, mealData)
        .subscribe(responseData => {
          const meal: Meal = {
            id: responseData.meal.id,
            name,
            description,
            ingredientsList,
            weight,
            price,
            quantity,
            imagePath: responseData.meal.imagePath
          };
          this.meals.push(meal);
          this.mealsUpdated.next([...this.meals]);
      });
  }
  updateMeal(
    id: string,
    name: string,
    description: string,
    ingredientsList: string,
    weight: number,
    price: number,
    image: File | string,
    nameUri: string) {
      let mealData: Meal | FormData;
      if (typeof image === 'object') {
        mealData = new FormData();
        mealData.append('id', id);
        mealData.append('name', name);
        mealData.append('description', description);
        mealData.append('ingredientsList', ingredientsList);
        mealData.append('weight', JSON.stringify(weight));
        mealData.append('price', JSON.stringify(price));
        mealData.append('image', image, name);
      } else {
          mealData = {
          id,
          name,
          description,
          ingredientsList,
          weight,
          price,
          imagePath: image
        };
      }
      this.http
        .put('http://localhost:3000' + nameUri + id, mealData)
        .subscribe(response => {
          const updatedMeals = [...this.meals];
          this.meals = updatedMeals;
          this.mealsUpdated.next([...this.meals]);
          this.router.navigate([nameUri]);
        });
  }

  deleteMeal(mealId: string, nameUri: string) {
    this.http
      .delete('http://localhost:3000' + nameUri + mealId)
      .subscribe(() => {
        const updatedMeals = this.meals.filter(meal => meal.id !== mealId);
        this.meals = updatedMeals;
        this.mealsUpdated.next([...this.meals]);
      });
  }

}
