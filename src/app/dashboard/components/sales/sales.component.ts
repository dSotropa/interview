import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {tap} from 'rxjs';
import {isNil, sortByColumn} from "../../../shared/utils/functions";
import {SalesDataService} from "../../../shared/services/sales-data.service";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {

  content: any;
  computeArray = ['salesQ1', 'salesQ2', 'salesQ3', 'salesQ4'];
  fieldIds: string[] = [];
  subHeaders: any[] = [];
  hasSubHeaders = false;
  searchTerm!: string;
  rows: any[] = [];
  sortMap: any = {};
  fieldInEdit!: number;

  constructor(private salesDataService: SalesDataService) {
  }


  ngOnInit(): void {
    this.salesDataService.$potatoSales
      .pipe(
        tap((data: any) => {
          this.processData(data);
        })
      )
      .subscribe()
  }

  search() {
    if (!this.searchTerm) {
      this.rows = this.content.data;
      return;
    }

    this.rows = this.content.data.filter((row: any) => {
      return Object.values(row).some((value: any) => (value + '').includes(this.searchTerm));
    })
  }

  clearSearch() {
    this.searchTerm = ''
    this.rows = this.content.data;
  }

  sortColumn(fieldId: string) {
    this.updateSortState(fieldId);
    if (isNil(this.sortMap[fieldId])) {
      this.rows = [...this.content.data];
    } else {
      sortByColumn(this.rows, fieldId, this.sortMap[fieldId]);
    }
  }


  saveRow(rowId: number) {
    this.fieldInEdit = -1;
    this.salesDataService.updateRow(rowId, this.rows[rowId]);
  }

  editRow(rowId: number) {
    this.fieldInEdit = rowId;
  }

  cancelEdit() {
    this.fieldInEdit = -1;
  }

  deleteRow(rowId: number) {
    this.salesDataService.deleteRow(rowId);
  }

  trackByColFn(item: any) {
    return item.header;
  }

  trackByFn(item: any) {
    return item.productID;
  }

  trackByFieldKey(item: any) {
    return item;
  }

  private processData(salesData: any) {
    this.content = salesData;
    this.subHeaders = [];
    this.fieldIds = [];

    // 2 cents hack :D
    this.content.column?.forEach((column: any) => {
      if (column.header === 'Total sales') {
        column.field = 'salesTotal';
      }
    })

    for (let column of this.content.column) {
      if (column.subHeaders) {
        this.hasSubHeaders = true;
        this.subHeaders = this.subHeaders.concat(column.subHeaders);
        this.fieldIds = this.fieldIds.concat(column.subHeaders.map((subHeader: any) => subHeader.field))
      } else {
        this.fieldIds.push(column.field);
      }
    }

    this.content.data = this.content.data.map((row: any) => {
      let salesTotal = 0;
      for (let key of this.computeArray) {
        salesTotal += +row[key] || 0;
      }
      row.salesTotal = salesTotal;
      return row;
    })
    this.rows = [...this.content.data];
  }

  private updateSortState(fieldId: string) {
    this.sortMap = {[fieldId]: this.sortMap[fieldId]};
    switch (this.sortMap[fieldId]) {
      case null:
      case undefined:
        this.sortMap[fieldId] = 'asc';
        break;
      case 'asc':
        this.sortMap[fieldId] = 'desc';
        break;
      case 'desc':
        this.sortMap[fieldId] = null;
        break;
    }
  }

}

