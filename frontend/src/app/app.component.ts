import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any = null;
  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    if (!this.user) {
      this.router.navigate(["/login"]);
    }
  }
}
