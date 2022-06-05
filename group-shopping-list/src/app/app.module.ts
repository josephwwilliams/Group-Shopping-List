import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { ProductDetailsComponent } from './shopping/product-details/product-details.component';
import { FitnessTrackingComponent } from './fitness-tracking/fitness-tracking.component';
import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    ToolbarComponent,
    ShoppingListComponent,
    PopUpComponent,
    ProductDetailsComponent,
    FitnessTrackingComponent,
    ShoppingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
