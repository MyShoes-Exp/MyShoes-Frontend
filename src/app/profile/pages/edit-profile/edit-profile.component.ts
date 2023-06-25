import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user/user.service";
import {User} from "../../../shared/model/user";
import {EditProfileService} from "../../services/edit-profile.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  country = new FormControl('');
  phone = new FormControl('');
  newpassword = new FormControl('');
  confirmpassword = new FormControl('');
  constructor(private route: Router, private userService: UserService, private editProfileService: EditProfileService) {}
  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const currentUser: User | undefined = this.userService.getCurrentUser();
    if (currentUser) {
      this.name.setValue(currentUser.name || '');
      this.email.setValue(currentUser.email || '');
      this.password.setValue(currentUser.password || '');
      this.country.setValue(currentUser.country || '');
      this.phone.setValue(currentUser.phone || '');
    }
  }
  saveChanges() {
    const updatedName = this.name.value ?? '';
    const updatedEmail = this.email.value ?? '';
    const updatedCountry = this.country.value ?? '';
    const updatedPassword = this.newpassword.value ?? '';
    const updatedPhoneNumber = this.phone.value ?? '';

    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      const updatedUser: User = {
        id: currentUser.id,
        name: updatedName,
        email: updatedEmail,
        password: updatedPassword,
        country: updatedCountry,
        phone: updatedPhoneNumber
      };
      this.editProfileService.updateUser(updatedUser).subscribe(
        ()=>{
          const updatedCurrentUser: User = { ...currentUser, ...updatedUser };
          this.userService.setCurrentUser(updatedCurrentUser);
          this.route.navigate(['/home']);
        }, (error)=>{
          console.error('Error while updating user profile: ', error);
        }
      );
    }
  }
}
