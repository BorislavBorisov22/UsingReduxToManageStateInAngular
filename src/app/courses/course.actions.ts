import { Observable } from 'rxjs/Rx';
import { CourseService } from './course.service';
import { IAppState } from './../store/IAppState';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Course } from './course';

export const FILTER_COURSES = 'courses/FILTER';
export const REQUEST_COURSES_SUCCESS = 'courses/REQUEST_COURSES_SUCCESS';
export const ADD_COURSE_SUCCESS = 'courses/ADD_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'courses/UPDATE_COURSE_SUCCESS';
export const DELETE_COURSE_SUCCESS = 'courses/DELETE_COURSE_SUCCESS';

@Injectable()
export class CourseActions {

  constructor(private ngRedux: NgRedux<IAppState>, private courseService: CourseService) { }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe((courses) => {
        this.ngRedux.dispatch({
          type: REQUEST_COURSES_SUCCESS,
          courses
        });
      });
  }

  filterCourses(searchText: string): void {
    this.ngRedux.dispatch({
      type: FILTER_COURSES,
      searchText
    });
  }

  addCourse(course: Course): Observable<any> {
    return this.courseService.addCourse(course)
      .do((char) => {
        this.ngRedux.dispatch({
          type: ADD_COURSE_SUCCESS,
          course
        });

        return char;
      });
  }

  updateCourse(course: Course): Observable<any> {
    return this.courseService.updateCourse(course)
      .do(() => {
        this.ngRedux.dispatch({
          type: UPDATE_COURSE_SUCCESS,
          course,
        });
      })
  }

  deleteCourse(course: Course): Observable<void> {
    return this.courseService.deleteCourse(course)
      .do(() => {
        this.ngRedux.dispatch({
          type: DELETE_COURSE_SUCCESS,
          course
        });
      });
  }
}
