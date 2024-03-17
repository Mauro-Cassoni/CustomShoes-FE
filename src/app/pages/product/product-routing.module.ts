import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AuthGuard } from '../profile/auth.guard';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '', component: ProductComponent
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    title: 'New Product - CustomShoes',
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    title: 'Edit Product - CustomShoes',
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
