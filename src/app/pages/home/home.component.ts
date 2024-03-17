import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private apiSvc: ApiShopService,
  ){}


}
