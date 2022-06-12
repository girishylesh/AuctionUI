import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductBid } from "../models/productbids"
import { AuthenticationService } from './authentication.service';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})

export class AuctionService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }
  
  getUser() {
    return this.httpClient.get(`${environment.apiEndpoint}/query/user/${this.authService.getCurrentUser()}`, {
       headers: this.authService.getHeaders()
     });
  }

  addAuctionUser(data: any) {
    return this.httpClient.post(`${environment.apiEndpoint}/cmd/add-user`, data, {
      headers: this.authService.getHeaders()
    });
  }

  createProduct(data: any) {
    return this.httpClient.post(`${environment.apiEndpoint}/cmd/seller/add-product`, data, {
      headers: this.authService.getHeaders(),
      responseType: 'text'
    });
  }

  deleteUser(productId: Number) {
    return this.httpClient.delete(`${environment.apiEndpoint}/user/auth/user/${productId}`, {
      headers: this.authService.getHeaders()
    });
  }

  placeBid(data: any) {
    return this.httpClient.post(`${environment.apiEndpoint}/cmd/buyer/place-bid`, data, {
      headers: this.authService.getHeaders()
    });
  }

  updateBid(productId: Number, buyerEmail: String, bidAmount: Number, data: any) {
    return this.httpClient.put(`${environment.apiEndpoint}/cmd/update-bid/${productId}/${buyerEmail}/${bidAmount}`, data, {
      headers: this.authService.getHeaders()
    });
  }

  getBids(productId: Number) {
    return this.httpClient.get<Array<ProductBid>>(`${environment.apiEndpoint}/query/seller/show-bids/${productId}`, {
      headers: this.authService.getHeaders()
    });
  }

  getProducts() {
    return this.httpClient.get<Array<Product>>(`${environment.apiEndpoint}/query/seller/products/${this.authService.getCurrentUserId()}`, {
      headers: this.authService.getHeaders()
    });
  }

}
