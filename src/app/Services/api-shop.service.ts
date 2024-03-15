import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/i-product';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiShopService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.URL}/products`);
  }

  getByCat(category: string): Observable<IProduct[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<IProduct[]>(`${environment.URL}/products`, { params });
  }

  getAllCat(): Observable<string[]> {
    return this.getAll().pipe(
      map(products => {
        const categories: string[] = [];
        products.forEach(product => {
          if (!categories.includes(product.category)) {
            categories.push(product.category);
          }
        });
        return categories;
      })
    );
  }

  searchByName(query: string, limit: number): Observable<IProduct[]> {
    let params = new HttpParams().set('name_like', query).set('_limit', limit.toString());
    return this.http.get<IProduct[]>(`${environment.URL}/products`, { params });
  }

  create(product: Partial<IProduct>): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.URL}/products`, product);
  }

  update(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${environment.URL}/products/${product.id}`, product);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.URL}/products/${id}`);
  }

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.URL}/products/${id}`);
  }

}
