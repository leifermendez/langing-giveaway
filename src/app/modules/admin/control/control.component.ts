import { Component, OnInit } from '@angular/core';
import {SocketCustomService} from "../../../services/socket-custom.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private socketCustom: SocketCustomService) { }

  ngOnInit(): void {
  }

  sendRaffle(): void {
    this.socketCustom.sendEvent('pick-winner', '')
  }

  sendRaffleDone(): void {
    this.socketCustom.sendEvent('pick-winner-done', '')
  }
}
