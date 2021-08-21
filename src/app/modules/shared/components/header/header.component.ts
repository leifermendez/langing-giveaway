import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UtilService} from "../../../../services/util.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('asHeader') asHeader: ElementRef
  links: Array<any> = []

  constructor(private utilService: UtilService, private renderer2: Renderer2) {
  }

  ngOnInit(): void {

    this.utilService.cbAction.subscribe(({a}) => {
      if (['SHOW_VIDEO', 'SHOW_COMMENT'].includes(a)) {
        this.initAnimate();
      }

      if (['HIDE_VIDEO', 'HIDE_COMMENT'].includes(a)) {
        this.stopAnimate();
      }
    });


    this.links = [
      {
        icon: '<i class="uil uil-youtube"></i>',
        name: 'Youtube',
        link: '//www.youtube.com/channel/UCgrIGp5QAnC0J8LfNJxDRDw?sub_confirmation=1'
      },
      {
        icon: '<i class="uil uil-facebook"></i>',
        name: 'Facebook',
        link: '//facebook.com/leifermendez.dev'
      },
      {
        icon: '<i class="uil uil-linkedin"></i>',
        name: 'Linkedin',
        link: '//www.linkedin.com/in/leifermendez/'
      },
      {
        icon: '<i class="uil uil-github"></i>',
        name: 'Github',
        link: '//github.com/leifermendez'
      }
    ]
  }


  initAnimate(): void {
    this.renderer2.addClass(this.asHeader.nativeElement, 'translate-top')
  }

  stopAnimate(): void {
    this.renderer2.removeClass(this.asHeader.nativeElement, 'translate-top')
  }

}
