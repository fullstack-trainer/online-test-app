import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SERVER_URL } from '../constants';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: any = [];
  constructor(private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.httpClient.get(SERVER_URL + "/results").subscribe(
      (response: any) => {
        this.scores = response;
      },
      err => {
        console.log("Error in getResults:", err);
      })
  }

}
