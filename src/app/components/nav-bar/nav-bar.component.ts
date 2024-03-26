import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: '.app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(
    public cartService: CartService,
    private authService : AuthService,
  ){}

  isLoggedIn$!:boolean

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
  }

  logout(){
    this.authService.logout();
  }

}
