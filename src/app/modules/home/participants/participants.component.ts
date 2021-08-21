import {Component, OnInit} from '@angular/core';
import {ApiRestService} from "../../../services/api-rest.service";
import {LocalStorageService} from "ngx-localstorage";
import {delay, finalize, tap, map} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  public numberComment = 0
  public user: any = {}
  public loading = true

  constructor(private apiRestService: ApiRestService, private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.user = JSON.parse(this.localStorage.get('user')) || null
    //TODO
    this.apiRestService.getNumberComments(this.user.name)
      .pipe(
        tap((a) => console.log('-----NO NECESITA RETORNAR---', a)),
        map((b) => {
          return {data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        }),
        delay(2000),
        finalize(() => this.loading = false)
      )
      .subscribe(a => this.numberComment = a.data.length)

  }
}
