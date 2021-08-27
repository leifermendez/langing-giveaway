import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as data from '../../../../assets/data/dynamic-policies.json';

@Component({
  selector: 'app-post-general',
  templateUrl: './post-general.component.html',
  styleUrls: ['./post-general.component.scss']
})
export class PostGeneralComponent implements OnInit {
  public terms: any;
  public outPut: any = {title: '', text: ''}

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.terms = this.route.snapshot.paramMap.get('slug')
    this.loadData()
  }

  loadData(): void {
    if (this.terms === 'raffle') {
      this.outPut = (data as any).raffle
      return
    }
    if (this.terms === 'privacy') {
      this.outPut = (data as any).privacy
      return
    }
    if (this.terms === 'legal') {
      this.outPut = (data as any).legal
      return
    }

  }

}
