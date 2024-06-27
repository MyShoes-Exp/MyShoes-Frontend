import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../shared/model/user";

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  basePath = 'https://myshoes.azurewebsites.net/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }
  updateUser(updatedUser: User): Observable<void> {
    const url = `${this.basePath}/${updatedUser.id}`;
    return this.http.put<void>(url, updatedUser);
  }
}
