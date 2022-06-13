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
      headers: this.authService.getHeaders(),
      responseType: 'text'
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
      headers: this.authService.getHeaders(),
      responseType: 'text'
    });
  }

  updateBid(productId: string, buyerEmail: string, bidAmount: Number) {
    return this.httpClient.put(`${environment.apiEndpoint}/cmd/update-bid/${productId}/${buyerEmail}/${bidAmount}`, {
      headers: this.authService.getHeaders()
    });
  }

  getBids(userId: String) {
    return this.httpClient.get<Array<ProductBid>>(`${environment.apiEndpoint}/query/show-bids/${userId}`, {
      headers: this.authService.getHeaders()
    });
  }

  getProducts() {
    return this.httpClient.get<Array<Product>>(`${environment.apiEndpoint}/query/products/${this.authService.getCurrentUserId()}`, {
      headers: this.authService.getHeaders()
    });
  }

  isSeller() {
    return this.authService.getCurrentUserType() === 'SELLER';
  }

  isBuyer() {
    return this.authService.getCurrentUserType() === 'BUYER';
  }
}
