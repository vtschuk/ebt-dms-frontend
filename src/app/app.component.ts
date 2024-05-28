import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";
import {ResponseToken} from "./model/responsetoken";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token?: ResponseToken | null;

  constructor(private loginService: LoginService) {
    this.loginService.token.subscribe(x => this.token = x);
  }


  logout() {
    this.loginService.logout();
  }

  ngOnInit(): void {

  }

}
