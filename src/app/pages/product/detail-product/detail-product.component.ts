import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiShopService } from '../../../Services/api-shop.service';
import { IProduct } from '../../../Models/i-product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent {

  constructor(
    private apiShopService: ApiShopService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  id!: string | null;
  product: IProduct = {
    id: 0,
    img: '',
    name: '',
    brand: '',
    category: '',
    description: '',
    size: 0,
    color: '',
    price: 0,
    onSale: false
  };

  ngOnInit(){

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.apiShopService.getById(Number(this.id)).subscribe(data => {
        this.product = data.obj;
      });
    });

  }

}
