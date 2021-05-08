import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SERVER_URL } from '../constants';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: any = {
    username: "",
    password: ""
  }

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('username', this.loginObj.username);
    httpParams = httpParams.append('password', this.loginObj.password);
    this.http.get(SERVER_URL + "/login", { params: httpParams }).subscribe(
      (response) => {
        console.log("response....", response);
        this.sessionService.setUser(response);
        window.location.href = "/quiz";
      },
      (err) => {
        console.log("err....", err);
        alert("Invalid credentials");
      }
    )
  }

}
