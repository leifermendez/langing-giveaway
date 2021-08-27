import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilService} from "../../../../services/util.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  public showFaq = false;
  private listObservables$: Array<Subscription> = [];

  constructor(public utilService: UtilService) {
  }

  ngOnInit(): void {
    const observer3$ = this.utilService.cbShowAll.subscribe(a => this.showFaq = a)
    this.listObservables$ = [observer3$];
  }
  ngOnDestroy(): void {
    this.listObservables$.forEach(a => a.unsubscribe())
  }

}
