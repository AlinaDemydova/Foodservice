import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  quantitySum: number;
  subscription: Subscription;

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.cartService.getQuantity()
    .subscribe(x => {
      if (x) { this.quantitySum = x; }
    });
  }

  ngOnInit() {
    // this.cartService.cartSubject
    //   .subscribe(x => {
    //     if (x) { this.quantitySum = x; }
    //   });
  }



}
