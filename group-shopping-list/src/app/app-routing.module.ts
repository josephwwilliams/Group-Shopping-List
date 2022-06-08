import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FitnessTrackingComponent } from './fitness-tracking/fitness-tracking.component';
import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ProductDetailsComponent } from './shopping/product-details/product-details.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { SettingsDialogComponent } from './shared/settings-dialog/settings-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'product/nutrients/:id', component: ProductDetailsComponent },
  { path: 'fitness', component: FitnessTrackingComponent },
  { path: 'home/settings', component: SettingsDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
