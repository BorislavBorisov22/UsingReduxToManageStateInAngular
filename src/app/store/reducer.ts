import { ADD_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from './../courses/course.actions';
import { IAppState } from './IAppState';
import { FILTER_COURSES, REQUEST_COURSES_SUCCESS } from '../courses/course.actions';

const initialState: IAppState = {
  courses: [],
  filteredCourses: []
};

function filterCourses(state: IAppState, action): IAppState {
  const filteredCourses = state.courses.filter(c => {
    return c.name.toLowerCase().includes(action.searchText.toLowerCase())
  });

  return Object.assign({}, state, {
    filteredCourses
  });
}

function storeCourses(state: IAppState, action): IAppState {
  return Object.assign({}, state, {
    courses: [...action.courses],
    filteredCourses: [...action.courses]
  });
}

function addCourse(state: IAppState, action): IAppState {
  const newCourses = [...state.courses, Object.assign({}, action.course)]

  return Object.assign({}, state, {
    courses: newCourses,
    filteredCourses: newCourses
  });
}

function updateCourse(state: IAppState, action): IAppState {
  const newCourses = state.courses.reduce((coursesAgg: any, currentCourse) => {
    const courseToAdd = currentCourse.id === action.course.id ?
      action.course : currentCourse;

    coursesAgg.push(Object.assign(courseToAdd));
    return coursesAgg;
  }, []);

  return Object.assign({}, state, {
    courses: newCourses,
    filteredCourses: newCourses
  });
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_COURSES:
      return filterCourses(state, action);
    case REQUEST_COURSES_SUCCESS:
      return storeCourses(state, action);
    case ADD_COURSE_SUCCESS:
      return addCourse(state, action);
    case UPDATE_COURSE_SUCCESS:
      return updateCourse(state, action);
    default:
      return state;
  }
}
