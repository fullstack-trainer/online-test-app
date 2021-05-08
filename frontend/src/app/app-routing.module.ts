import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "quiz", component: QuizComponent },
  { path: "scores", component: ScoresComponent },
  { path: "**", redirectTo: "/quiz" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
