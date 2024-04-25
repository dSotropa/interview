import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SalesDataService {

  $potatoSales: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private patatoSalesData: any;

  constructor(private http: HttpClient) {
  }

  getSalesData() {
    this.http.get('./assets/potato_sales.json', {responseType: 'text'})
      .pipe(
        tap((fileContent: string) => {
          this.patatoSalesData = JSON.parse(fileContent);
          this.$potatoSales.next(this.patatoSalesData);
        }),
        catchError(() => of('n\a')),
        take(1))
      .subscribe()
  }

  addNewProduct(product: any) {
    this.patatoSalesData.data.push(product);
    this.$potatoSales.next(this.patatoSalesData);
  }
}
