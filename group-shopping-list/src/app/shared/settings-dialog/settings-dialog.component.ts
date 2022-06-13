import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css'],
})
export class SettingsDialogComponent implements OnInit {
  changed: boolean = false;

  firstName: string = 'Joseph';
  lastName: string = 'Williams';
  selectedGender: string = 'Male';

  genders: string[] = ['Male', 'Female', 'Non-Binary', 'I Prefer To Not Say'];

  constructor(private authService: AuthService) {}
  url: any;
  ngOnInit(): void {}
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target.result;
        console.log(this.url);
      };
    }
  }
  public delete() {
    this.url = null;
  }

  onSubmit(form: NgForm) {
    this.changed = true;
    console.log(form);
    setTimeout(() => {
      this.changed = false;
    }, 2000);
  }

  logout() {
    this.authService.logout();
  }
}
