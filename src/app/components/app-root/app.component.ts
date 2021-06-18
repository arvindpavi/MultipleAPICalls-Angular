import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CoreApi } from '../../interfaces/core-api.interface';

import * as data from '../../../assets/user-data.json';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  public cards: Array<CoreApi> = (data as any).default;
  private apiCounter: number = 0;
  private readonly serverLimit: number = 2;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    for (let i = 0; i < this.serverLimit; i++) {
      this.fetchUserDetails(i, this.cards);
      this.apiCounter = i;
    }
  }

  private fetchUserDetails(counter: number, data: Array<CoreApi>) {
    this.fetchAPIData(data[counter].id, data[counter].apiUrl).then(response => {
      data[response.cardId - 1].apiResponse = response;
      this.apiCounter = this.apiCounter + 1;
      if (this.apiCounter < data.length) {
        this.fetchUserDetails(this.apiCounter, data);
      }
    });
  }

  private async fetchAPIData(id: number, url: string) {
    return await this.http.get<CoreApi>(url).pipe(
      map((response) => {
        response.cardId = id;
        return response;
      })).toPromise()
  }
}
