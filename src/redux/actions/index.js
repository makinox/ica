export const saveStudentFinesInStore = (fines) => ({
  type: 'SAVE_STUDENT_FINES_IN_STORE',
  fines
})

export const saveStudentData = (student) => ({
  type: 'SAVE_STUDENT_DATA',
  student
})

export const setCurrentUserData = (currentUserData) => ({
  type: 'SET_CURRENT_USER_DATA',
  currentUserData
})

export const changeShowForm = (show) => ({
  type: 'CHANGE_SHOW_FORM',
  show
})

export const filterItemFromFineListById = (_id) => ({
  type: 'FILTER_ITEM_FROM_FINE_LIST',
  _id
})
