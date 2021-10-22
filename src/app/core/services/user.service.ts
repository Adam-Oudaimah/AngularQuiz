import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersApi: string = this._constansService.baseUrl + 'users';

  public responseCache = new Map();

  constructor(
    private httpClient: HttpClient,
    private _constansService: ConstantsService
  ) {}

  getUsersList(pageNumber: number): Observable<any> {
    const beersFromCache = this.responseCache.get(
      this.usersApi + '?page=' + pageNumber
    );
    if (beersFromCache) {
      return of(beersFromCache);
    }

    const response = this.httpClient.get<any>(
      this.usersApi + '?page=' + pageNumber
    );
    response.subscribe((beers) =>
      this.responseCache.set(this.usersApi + '?page=' + pageNumber, beers)
    );
    return response;
  }
  getUserDetails(userId: number): Observable<any> {
    const beersFromCache = this.responseCache.get(this.usersApi + '/' + userId);
    if (beersFromCache) {
      return of(beersFromCache);
    }

    const response = this.httpClient.get<any>(this.usersApi + '/' + userId);
    response.subscribe((beers) =>
      this.responseCache.set(this.usersApi + '/' + userId, beers)
    );
    return response;
  }
}
