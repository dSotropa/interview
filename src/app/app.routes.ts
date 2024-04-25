import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { NewProductComponent } from './dashboard/components/new-product/new-product.component';
import { SalesComponent } from './dashboard/components/sales/sales.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', title:"Login Page", component: LoginComponent },
    { path: '', title:"Dashboard", component: DashboardComponent, canActivate:[AuthGuard] },
    { path: 'new-product', title:"Dashboard", component: NewProductComponent, canActivate:[AuthGuard] },
    { path: 'sales', title:"Sales", component: SalesComponent, canActivate:[AuthGuard] },


];
