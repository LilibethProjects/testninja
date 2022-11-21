import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
private url = 'https://my-user-manager.herokuapp.com/';
private httpOptions: object | undefined;
private httpHeaders: HttpHeaders | undefined;

  constructor(private http: HttpClient) { }

 public getUser( ): Observable<User[]> {
  const httpParams: HttpParams = new HttpParams();
  this.httpOptions = {
    headers: this.httpHeaders,
    params: httpParams,
  };

  return this.http.get<User>(this.url + 'users/' , this.httpOptions).pipe(
    map((response: any) => {
      response.data = (response.data);
      return response;
     }),
  );
  }

  public updateUser(user: User) {
    const httpParams: HttpParams = new HttpParams();
    this.httpOptions = {
      headers: this.httpHeaders,
      params: httpParams,
    };

    return this.http.put<User>(this.url + 'users/' + user.id, user, this.httpOptions).pipe(
      map((response: any) => {
        return (response);
      }),
    );
  }

  public createUser(user: User) {
    const httpParams: HttpParams = new HttpParams();
    this.httpOptions = {
      headers: this.httpHeaders,
      params: httpParams,
    };
    return this.http.post<User>(this.url + 'users/', user, this.httpOptions).pipe(
      map((response: any) => {
        return (response);
      }),
    );
  }

  public delete(user: User) {
    this.httpOptions = {
      headers: this.httpHeaders,
      params: {},
    };
    return this.http.delete<any>(this.url + 'users/' + user.id, this.httpOptions).pipe(
      map((response: any) => {
        return (response);
      }),
    );
  }
}
