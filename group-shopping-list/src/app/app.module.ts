import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ToolbarComponent } from './shared/toolbars/toolbar/toolbar.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { ProductDetailsComponent } from './shopping/product-details/product-details.component';
import { FitnessTrackingComponent } from './fitness-tracking/fitness-tracking.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsDialogComponent } from './shared/settings-dialog/settings-dialog.component';
import { NoUserToolbarComponent } from './shared/toolbars/no-user-toolbar/no-user-toolbar.component';
import { UserHomePageComponent } from './home/user-home-page/user-home-page.component';
import { PlaceholderPipePipe } from './shared/pipes/placeholder-pipe.pipe';
import { AuthComponent } from './shared/services/auth/auth.component';
import { AuthInterceptorService } from './shared/services/auth/auth-interceptor.service';
import { FooterComponent } from './shared/footer/footer.component';

import { MatNativeDateModule } from '@angular/material/core';
import { BottomSheetComponent } from './shared/bottom-sheet/bottom-sheet.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

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
    SettingsDialogComponent,
    NoUserToolbarComponent,
    UserHomePageComponent,
    PlaceholderPipePipe,
    AuthComponent,
    FooterComponent,
    BottomSheetComponent,
    ChatBotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgChartsModule,
    NgbModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
