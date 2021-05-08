import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navLinks = [
    { name: "Quiz", link: "/quiz" },
    { name: "Scores", link: "/scores" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
