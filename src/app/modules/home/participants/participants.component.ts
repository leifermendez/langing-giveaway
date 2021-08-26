import {Component, OnInit} from '@angular/core';
import {ApiRestService} from "../../../services/api-rest.service";
import {LocalStorageService} from "ngx-localstorage";
import {delay, finalize, tap, map} from "rxjs/operators";
import {of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  public numberComment = 0
  public user: any = {}
  public loading = true
  public showComment = false;
  public listComment: any = []
  public urlMain = environment.videoMain

  // public dd!: any;

  constructor(private apiRestService: ApiRestService, private localStorage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.user = JSON.parse(this.localStorage.get('user')) || null
    //TODO
    this.apiRestService.getNumberComments(this.user?._id)
      .pipe(
        delay(2000),
        finalize(() => this.loading = false)
      )
      .subscribe(a => {
        const {video1, video2} = a.data;
        this.listComment = this.listComment.concat(video1).concat(video2)
        this.numberComment = this.listComment.length
      })

  }

  redirectHome(): void {
    this.localStorage.remove('user')
    this.router.navigate(['/'])
  }

  showMyComments(): void {
    this.showComment = true;
  }
}
