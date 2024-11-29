import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getStates(country: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/states/${country}`);
  }

  getCities(state: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cities/${state}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
