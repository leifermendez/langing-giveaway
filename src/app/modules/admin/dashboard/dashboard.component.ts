import {Component, OnInit} from '@angular/core';
import {SocketCustomService} from "../../../services/socket-custom.service";
import {GetRaffleService} from "../services/get-raffle.service";

declare var confetti: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  participants: Array<any> = []
  public status = 'wait'
  public myStateInterval: any
  public winner: any;

  constructor(private socketCustom: SocketCustomService, private getRaffleService: GetRaffleService) {
  }

  ngOnInit(): void {
    // this.participants = [...Array.from(Array(50)).keys()]
    // setInterval(() => {
    //     this.random()
    // },150)
    this.listenWinner()
    this.getData()
  }

  setStateDynamic(data): void {
    if (data?.dynamic === 'process') {
      this.myStateInterval = setInterval(() => this.random(), 1000)
      return
    }
    if (data?.dynamic === 'done') {
      this.winner = data?.winner;
      clearInterval(this.myStateInterval)
      return
    }
  }

  getData(): void {
    this.getRaffleService.get()
      .subscribe(({data, comments}) => {
        this.setStateDynamic(data)
        this.participants = [...comments, ...[...Array.from(Array(100)).keys()]]
      })
  }

  listenWinner(): void {
    this.socketCustom.getEvent('pick-winner')
      .subscribe(res => {
        this.setStateDynamic(res)
      })

    this.socketCustom.getEvent('pick-winner-done')
      .subscribe(res => {
        this.setStateDynamic(res)
        this.winner = res?.winner
        this.confettiEffect()
        console.log(res)
      })
  }

  sendRaffle(): void {
    this.socketCustom.sendEvent('pick-winner', '')
  }

  sendRaffleDone(): void {
    this.socketCustom.sendEvent('pick-winner-done', '')
  }

  random(): void {
    const tmpParticipants = this.participants;
    const newList = [...tmpParticipants];
    newList.sort(() => Math.random() - 0.5);
    this.participants = newList;
  }

  confettiEffect(): void {
    const end = Date.now() + (15 * 1000);
    const colors = ['#ff1260', '#ffffff'];

    // tslint:disable-next-line:typedef
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: {x: 0},
        colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: {x: 1},
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}
