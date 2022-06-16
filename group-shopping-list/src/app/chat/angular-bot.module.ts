import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ChatComponent],
  providers: [ChatService],
})
export class AngularBotModule {}
