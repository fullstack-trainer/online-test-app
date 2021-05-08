import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../constants';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questionsArr: any = [];
  answersArr: any = [];
  user: any = {};

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.getQuestions();
  }

  getQuestions() {
    this.httpClient.get(SERVER_URL + "/questions").subscribe(
      (response: any) => {
        this.questionsArr = response;
        this.answersArr = response.map(() => "");
        console.log("response....", response);
      },
      err => {
        console.log("Error in getQuestions:", err);
      })
  }

  setValueForRadio(opt: any, ind: any) {
    this.answersArr[ind] = opt;
  }

  onSubmit() {
    console.log("this.answersArr....", this.answersArr);
    this.httpClient.get(SERVER_URL + "/evaluate?answers=" + this.answersArr + "&username=" + this.user.username).subscribe(
      (response: any) => {
        alert("Test submitted successfully! Your score is " + response.score);
      },
      err => {
        console.log("err....", err);
        alert("Error in submitting");
      }
    )
  }

}
