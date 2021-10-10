import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {UtilService} from '../../../../services/util.service';
import {FacebookService, InitParams} from "ngx-facebook";
import {environment} from "../../../../../environments/environment";
import {ApiRestService} from "../../../../services/api-rest.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {HomeService} from "../../services/home.service";

declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})


export class JoinComponent implements OnInit {
  @ViewChild('asJoin') asJoin: ElementRef;
  @ViewChild('asVideo') asVideo: ElementRef;
  @ViewChild('asComments') asComments: ElementRef;
  @ViewChild('asCommentFb') asCommentFb: ElementRef;
  private apiLoaded = false;
  playerVars: any;
  player: YT.Player;
  steps: Array<string> = [];
  showComment: any = false;
  menuSteps: Array<any> = []
  participants: Array<any> = [];
  urlComment = `130456915783281`;
  listObservables$: Array<Subscription> = []
  showAll = false;
  currentUser: any = null
  showFaq = false;

  constructor(private utilService: UtilService, private renderer2: Renderer2, private fb: FacebookService,
              private apiRestService: ApiRestService, private route: ActivatedRoute,
              private homeService: HomeService) {

    this.showComment = this.route.snapshot.queryParamMap.get('show_comment');

  }


  ngOnInit(): void {
    // @ts-ignore
    this.currentUser = this.homeService.getCurrentUser()
    this.steps = ['STEP_1'];

    const errorSession = this.route.queryParams.subscribe(({error}) => {
      if (error) {
        this.currentUser = null;
        this.homeService.cleanCurrentUser()
      }
    })

    console.log(errorSession)

    this.menuSteps = [
      {
        icon: '<i class="uil uil-google"></i>',
        label: 'Continuar Gmail',
        class: 'yt-btn btn-step-1',
        href: `${environment.api}/auth/login-youtube`
      }
    ]

    this.playerVars = {
      controls: 1,
      rel: 0,
      showinfo: 0, // <- This part here
      fs: 0,
      cc_load_policy: 1,
      cc_lang_pref: 'es',
      iv_load_policy: 3
    };
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    const observer1$ = this.utilService.cbAction.subscribe(({a}) => {
      // console.log(a)
      if (a === 'SHOW_VIDEO') {
        this.initAnimateVideo();
        this.player.playVideo();
        return;
      }

      if (a === 'SHOW_COMMENT') {
        this.initAnimateComment();
        // this.player.playVideo();
        return;
      }

      if (a === 'HIDE_VIDEO') {
        this.stopAnimateVideo();
        this.closeVideo();
        return;
      }

    });
    const observer2$ = this.utilService.cbMoreInfo.subscribe(({a}) => {
      this.showFaq = (a !== 'HIDE_FAQ_1')
    })
    const observer3$ = this.utilService.cbShowAll.subscribe(a => this.showAll = a)
    this.listObservables$ = [observer1$, observer2$, observer3$]
  }


  initAnimateComment(): void {
    this.renderer2.addClass(this.asJoin.nativeElement, 'translate-bottom');
    this.renderer2.removeClass(this.asCommentFb.nativeElement, 'hide-post');
  }

  initAnimateVideo(): void {
    this.renderer2.addClass(this.asJoin.nativeElement, 'translate-bottom');
    this.renderer2.removeClass(this.asVideo.nativeElement, 'hide-video');
  }

  stopAnimateVideo(): void {
    this.renderer2.removeClass(this.asJoin.nativeElement, 'translate-bottom');
    this.renderer2.addClass(this.asVideo.nativeElement, 'hide-video');
  }

  move(a): void {
    this.utilService.cbAction.emit({a});
  }

  setPlayer($event: YT.PlayerEvent): void {
    this.player = $event.target;
  }

  closeVideo(): void {
    this.player.pauseVideo();
  }
}
