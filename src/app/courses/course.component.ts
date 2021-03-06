import { Observable } from 'rxjs/Observable';
import { CourseActions } from './course.actions';
import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../blocks/toast';
import { ModalService } from '../blocks/modal';
import { select } from 'ng2-redux';
@Component({
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit, AfterContentChecked {
  @select('courses') courses: Observable<Course[]>;

  @Input() course: Course;
  editCourse: Course = <Course>{};

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastService: ToastService,
    private _modalService: ModalService,
    private courseActions: CourseActions
  ) { }

  private _getCourse() {

    let id = +this._route.snapshot.params['id'];
    if (id === 0) return;
    if (this.isAddMode()) {
      this.course = <Course>{ name: '', topic: 'Web' };
      this.editCourse = this.course;
      return;
    }

    this.courses.subscribe(courses => {
      const targetCourse = courses.find(c => c.id === id);
      this._setEditCourse(targetCourse);
    });
  }

  private _setEditCourse(course: Course) {
    if (course) {
      this.course = course;
      this.editCourse = Object.assign({}, this.course);
    } else {
      this._gotoCourses();
    }
  }

  cancel(showToast = true) {
    this.editCourse = Object.assign({}, this.course);
    if (showToast) {
      this._toastService.activate(`Cancelled changes to ${this.course.name}`);
    }

    this._router.navigate(['courses']);
  }

  isAddMode() {
    const id = +this._route.snapshot.params['id'];
    return isNaN(id);
  }

  save() {
    let course = this.course;
    if (course.id == null) {
      this.courseActions.addCourse(this.editCourse)
        .subscribe((char) => {
          this._setEditCourse(char);
          this._toastService.activate(`Successfully added ${char.name}`);
          this._gotoCourses();
        });

      return;
    }

    this.courseActions.updateCourse(this.editCourse)
      .subscribe(() => {
        this._toastService.activate(`Successfully saved ${course.name}`);
        this._gotoCourses();
      });
  }

  delete() {
    let msg = `Do you want to delete ${this.course.name}?`;
    this._modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.cancel(false);
        this.courseActions.deleteCourse(this.course)
          .subscribe(() => {
            this._toastService.activate(`Deleted ${this.course.name}`);
            this._gotoCourses();
          });
      }
    });
  }

  private _gotoCourses() {
    this._router.navigate(['courses']);
  }

  ngOnInit() {
    this._getCourse();
  }

  ngAfterContentChecked() {
    componentHandler.upgradeDom();
  }
}
