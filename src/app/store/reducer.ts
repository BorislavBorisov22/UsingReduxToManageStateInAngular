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

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_COURSES:
      return filterCourses(state, action);
    case REQUEST_COURSES_SUCCESS:
      return storeCourses(state, action);
    default:
      return state;
  }
}
