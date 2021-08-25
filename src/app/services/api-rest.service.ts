import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private httpClient: HttpClient) {
  }

  getParticipants(): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/participants`);
  }

  getNumberComments(name = ''): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/comments`);
  }
}
