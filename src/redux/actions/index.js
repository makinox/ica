export const saveStudentFinesInStore = (fines) => ({
  type: 'SAVE_STUDENT_FINES_IN_STORE',
  fines
})

export const saveStudentData = (student) => ({
  type: 'SAVE_STUDENT_DATA',
  student
})

export const setCurrentUserType = (currentUserType) => ({
  type: 'SET_CURRENT_USER_TYPE',
  currentUserType
})
