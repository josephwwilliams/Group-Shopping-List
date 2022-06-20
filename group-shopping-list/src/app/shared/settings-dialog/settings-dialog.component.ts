import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/auth/user-storage.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css'],
})
export class SettingsDialogComponent implements OnInit {
  changed: boolean = false;

  firstName: string;
  lastName: string;
  selectedGender: string;

  genders: string[] = ['Male', 'Female', 'Non-Binary', 'I Prefer To Not Say'];

  constructor(
    private authService: AuthService,
    private userStorageService: UserStorageService
  ) {}
  url: any;
  ngOnInit(): void {
    this.userStorageService
      .fetchUserFromFireBase()
      .subscribe((userData: any) => {
        this.url = userData.profileImg;

        this.selectedGender = userData.gender[0];
        this.firstName = userData.firstName[0];
        this.lastName = userData.lastName[0];
        console.log(this.url);
      });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
      };
    }
  }
  public delete() {
    this.url = null;
  }

  onSubmit(form: NgForm) {
    this.changed = true;
    setTimeout(() => {
      this.changed = false;
    }, 2000);
    this.userStorageService.saveProfilePicture(this.url).subscribe();

    this.userStorageService.changeFirstName(form.value.firstName).subscribe();
    this.userStorageService.changeLastName(form.value.lastName).subscribe();
    this.userStorageService.changeGender(form.value.gender).subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
