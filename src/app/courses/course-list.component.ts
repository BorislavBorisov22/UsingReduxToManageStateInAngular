import { store, filterCourses } from './../store';
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
  filteredCourses: Course[] = [];

  constructor(private _courseService: CourseService) {
  }

  filterChanged(searchText: string) {
    console.log('user searched: ', searchText);
    store.dispatch(filterCourses(searchText));
  }

  updateFromState() {
    this.filteredCourses = store.getState().filteredCourses;
  }

  ngOnInit() {
    this.updateFromState();
    store.subscribe(() => {
      this.updateFromState();
    });

    componentHandler.upgradeDom();
  }
}
