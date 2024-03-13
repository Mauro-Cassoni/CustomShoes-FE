import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrderComponent } from './order/order.component';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent,
    EditAddressComponent,
    WishlistComponent,
    OrderComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
