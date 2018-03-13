import { CourseActions } from './courses/course.actions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private courseActions: CourseActions) { }

  title = 'app works!';
  public menuItems = [
    { caption: 'Courses', link: '/courses' },
  ];

  resetDb() {
    console.log('resetting DB!!!!');
  }

  public ngOnInit(): void {
    this.courseActions.getCourses();
  }
}
