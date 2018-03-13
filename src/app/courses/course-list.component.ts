import { CourseActions } from './course.actions';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './../store';
import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';
import { FilterTextComponent } from '../blocks/filter-text';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  @select('filteredCourses') filteredCourses$: Observable<Course[]>

  constructor(private ngRedux: NgRedux<IAppState>, private courseActions: CourseActions) {
  }

  filterChanged(searchText: string) {
    this.courseActions.filterCourses(searchText);
  }

  ngOnInit() {
    // this.courseActions.getCourses();
    componentHandler.upgradeDom();
  }
}
