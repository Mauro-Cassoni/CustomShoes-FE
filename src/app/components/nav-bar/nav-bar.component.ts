import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: '.app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(
    private apiSvc : ApiShopService,
    private authService : AuthService,
  ){}

  isLoggedIn$!:boolean

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res)
  }

  logout(){
    this.authService.logout();
  }

}
