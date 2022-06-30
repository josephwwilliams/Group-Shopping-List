import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  FormResponse,
  UserStorageService,
} from '../../services/auth/user-storage.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { SettingsDialogComponent } from '../../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  show = false;
  private subscriptions = new Subscription();
  shoppingList: number = 0;
  settingsOpen = false;
  settingsDialogRef: any;
  isSettingsDialogOpen: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private dialog: MatDialog,
    private userStorage: UserStorageService
  ) {}

  ngOnInit(): void {
    this.subscriptions =
      this.shoppingListService.changeToShoppingList.subscribe(
        (addOrSubtract: number) => {
          if (addOrSubtract === -1 || addOrSubtract === 1) {
            this.shoppingList += addOrSubtract;
          } else {
            this.shoppingList = addOrSubtract;
          }
        }
      );
    this.userStorage
      .fetchUserFromFireBase()
      .subscribe((currentUser: FormResponse) => {
        this.userStorage.currentUser = currentUser;
      });
  }

  open() {
    if (this.isSettingsDialogOpen) {
      return;
    }

    this.isSettingsDialogOpen = true;

    this.settingsDialogRef = this.dialog.open(SettingsDialogComponent);

    this.settingsDialogRef.afterClosed().subscribe((res: any) => {
      this.isSettingsDialogOpen = false;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
