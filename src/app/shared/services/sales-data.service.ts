import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SalesDataService {

  $potatoSales: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private potatoSalesData: any;

  constructor(private http: HttpClient) {
  }

  getSalesData() {
    this.http.get('./assets/potato_sales.json', {responseType: 'text'})
      .pipe(
        tap((fileContent: string) => {
          this.potatoSalesData = JSON.parse(fileContent);
          this.$potatoSales.next(this.potatoSalesData);
        }),
        catchError(() => of('n\a')),
        take(1))
      .subscribe()
  }

  addNewProduct(product: any) {
    this.potatoSalesData.data.push(product);
    this.$potatoSales.next(this.potatoSalesData);
  }

  updateRow(rowId: number, rowData: any) {
    this.potatoSalesData.data[rowId] = rowData;
    this.$potatoSales.next(this.potatoSalesData);
  }

  deleteRow(rowId: number) {
    this.potatoSalesData.data.splice(rowId, 1);
    this.$potatoSales.next(this.potatoSalesData);
  }
}
