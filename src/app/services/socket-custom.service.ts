import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketCustomService {

  constructor(private socket: Socket) {
  }

  sendEvent(event: string, data: string): void {
    this.socket.emit(event, data);
  }

  getEvent(event: string): Observable<any> {
    return this.socket.fromEvent(event)
  }
}
