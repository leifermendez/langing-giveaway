import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UtilService} from "../../../../services/util.service";
import Typewriter from 't-writer.js';
import {Subscription} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss']
})
export class HomeSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('asHome') asHome: ElementRef;
  @ViewChild('asTitle') asTitle: ElementRef;
  @ViewChild('asHideFaq1') asHideFaq1: ElementRef;
  @ViewChild('asHideFaq2') asHideFaq2: ElementRef;
  @ViewChild('asHideFaq3') asHideFaq3: ElementRef;
  showCase = false;
  menuSteps: Array<any> = []
  showFaq = false;
  listObservables$: Array<Subscription> = []
  listSocial: Array<any> = []

  constructor(public utilService: UtilService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {

    this.listSocial = [
      {
        name: 'YOUTUBE',
        url: 'http://www.youtube.com/channel/UCgrIGp5QAnC0J8LfNJxDRDw'
      },
      {
        name: 'FACEBOOK',
        url: 'https://www.facebook.com/leifermendez.dev'
      },
      {
        name: 'TELEGRAM',
        url: 'https://t.me/leifermendez'
      }
    ]

    const observer1$ = this.utilService.cbAction.subscribe(({a}) => {
      if (['SHOW_VIDEO', 'SHOW_COMMENT'].includes(a)) {
        this.initAnimate();
      }

      if (['HIDE_VIDEO', 'HIDE_COMMENT'].includes(a)) {
        this.stopAnimate();
      }
    });
    const observer2$ = this.utilService.cbMoreInfo.subscribe(({a}) => {
      this.utilService.scrollToTop()
      if (a && a === 'SHOW_FAQ_1') {
        this.initMove('asHideFaq1')
        return
      }
      if (a && a === 'HIDE_FAQ_1') {
        this.removeMove('asHideFaq1')
        return
      }

    });
    const observer3$ = this.utilService.cbShowAll.subscribe(a => this.showFaq = a)
    this.menuSteps = [
      {
        icon: '<i class="uil uil-google"></i>',
        label: 'Conectar Facebook',
        class: 'yt-btn btn-step-1',
        step: 'Paso 1',
        url: `${environment.api}/auth/login-youtube`
      },
      {
        icon: '<i class="uil uil-youtube"></i>',
        label: 'Comentar Post',
        class: 'fb-btn-third btn-step-3',
        step: '+ info',
        url: `https://youtu.be/38zHGnjtCJU`
      }
    ]
    this.listObservables$ = [observer1$, observer2$, observer3$];
  }

  ngOnDestroy(): void {
    this.listObservables$.forEach(a => a.unsubscribe())
  }

  ngAfterViewInit(): void {
    this.typeEffect()
  }

  move(a): void {
    this.utilService.cbAction.emit({a});
  }

  moreInfo(a): void {
    this.utilService.cbMoreInfo.emit({a});
  }

  typeEffect(): void {
    const writer = new Typewriter(this.asTitle.nativeElement, {
      loop: false,
      typeColor: 'white'
    })

    writer
      .changeCursorColor('white')
      .type('¿A qué equipo perteneces Frontend o Backend?')
      .changeOps({deleteSpeed: 80})
      .then(() => this.utilService.cbShowAll.emit(true))
      .start();

  }

  initAnimate(): void {
    this.renderer2.addClass(this.asHome.nativeElement, 'translate-top');
  }

  initMove(section): void {
    this.renderer2.addClass(this.asHome.nativeElement, 'translate-left');
    this.renderer2.addClass(this[section].nativeElement, 'show-faq');
  }

  removeMove(section): void {
    this.renderer2.removeClass(this.asHome.nativeElement, 'translate-left');
    this.renderer2.removeClass(this[section].nativeElement, 'show-faq');
  }

  stopAnimate(): void {
    this.renderer2.removeClass(this.asHome.nativeElement, 'translate-top');
  }

  cbShowCase = () => this.showCase = !this.showCase;

}
