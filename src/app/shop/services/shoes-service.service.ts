import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from "rxjs";
import {Shoes} from "../model/shoes";

@Injectable({
  providedIn: 'root'
})
export class ShoesServiceService{
  basePath = 'http://localhost:3000/api/v1/shoes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }
  constructor(private http:HttpClient) { }

  //
  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() =>
      new Error('Something happened with request, please try again later'));
  }

  //getAll
  initShoes(){
    return this.http.get(`${this.basePath}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}