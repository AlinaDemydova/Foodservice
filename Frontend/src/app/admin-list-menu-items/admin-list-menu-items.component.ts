import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal } from '../models/meal.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MealService } from '../services/meal.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import defaultConfig from '../../../config/default';
import { mimeType } from './mime-type.validator';
@Component({
  selector: 'app-admin-list-menu-items',
  templateUrl: './admin-list-menu-items.component.html',
  styleUrls: ['./admin-list-menu-items.component.scss']
})
export class AdminListMenuItemsComponent implements OnInit, OnDestroy {
  defConfig = defaultConfig;
  panelOpenState = false;
  isNone: boolean;
  ngClass: any;
  meals: Meal[] = [];
  meal: Meal;
  private mealsSub: Subscription;
  private mode = 'create';
  mealId: string;
  defaultQuantity = 1;

  form: FormGroup;
  imagePreview: string;

  constructor(
    public mealService: MealService,
    public route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      ingredientsList: new FormControl(null, {
        validators: [Validators.required]
      }),
      weight: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.isNone = true;
    this.mealService.getMeals(this.defConfig.adminMenuURI);
    this.mealsSub = this.mealService.getMealUpdateListener()
      .subscribe((meals: Meal[]) => {
        this.meals = meals;
      });

    const myId = this.route.snapshot.paramMap.get('id');

    this.meal = this.meals.find(meal => meal.id === myId);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (myId) {
        this.isNone = false;
        this.mode = 'edit';
        this.mealId = myId;
        this.mealService.getOneMeal(this.mealId, this.defConfig.adminMenuURI).subscribe(mealData => {
          this.meal = {
            id: mealData._id,
            name: mealData.name,
            description: mealData.description,
            ingredientsList: mealData.ingredientsList,
            weight: mealData.weight,
            price: mealData.price,
            quantity: mealData.quantity,
            imagePath: mealData.imagePath};
          this.form.setValue({
            name: this.meal.name,
            description: this.meal.description,
            ingredientsList: this.meal.ingredientsList,
            weight: this.meal.weight,
            price: this.meal.price,
            quantity: this.meal.quantity,
            image: this.meal.imagePath
          });
        });
      } else {
        this.isNone = true;
        this.mode = 'create';
        this.mealId = null;
      }
    });

  }
  createOrderForm() {
    this.isNone = false;
  }
  onDelete(mealId: string) {
    this.mealService.deleteMeal(mealId, this.defConfig.adminMenuURI);
  }

  ngOnDestroy() {
    this.mealsSub.unsubscribe();
  }

  onSaveMeal() {
    if (this.form.invalid) { return; }
    if (this.mode === 'create') {
      this.mealService.addMeal(
        this.form.value.name,
        this.form.value.description,
        this.form.value.ingredientsList,
        this.form.value.weight,
        this.form.value.price,
        this.defaultQuantity,
        this.form.value.image,
        this.defConfig.adminMenuURI);
    } else {
      this.mealService.updateMeal(
        this.mealId,
        this.form.value.name,
        this.form.value.description,
        this.form.value.ingredientsList,
        this.form.value.weight,
        this.form.value.price,
        this.form.value.image,
        this.defConfig.adminMenuURI);
    }
    this.form.reset();
    this.isNone = true;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


}
