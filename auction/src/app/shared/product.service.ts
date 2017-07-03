import {EventEmitter, Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }

  getAllCategories(): string[] {
    return ['电子产品', '硬件设备', '图书'];
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }
  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get('/api/product/' + id + '/comments').map(res => res.json());
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    console.log(this.encodeParams(params));
    return this.http.get('/api/products', {params: this.encodeParams(params)}).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams) {  // 直接用{}对象，不需要用URLSearchParams了
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: {}, key: string) => {
        sum[key] = params[key];
        return sum;
      }, {});
  }
}

export class ProductSearchParams {
  constructor(public title: string,
  public price: number,
  public category: string
  ) { }
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {
  }
}

export class Comment {
  constructor(public id: number,
              public productId: number,
              public timestamp: string,
              public user: string,
              public rating: number,
              public content: string) {

  }
}
