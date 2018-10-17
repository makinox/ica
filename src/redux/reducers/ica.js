const ica = (state = {
  fines: [],
  currentUserType: '',
  student: {}
}, action) => {
  switch (action.type) {
    case 'SAVE_STUDENT_FINES_IN_STORE':
      return {
        ...state,
        fines: action.fines
      }
    case 'SAVE_STUDENT_DATA':
      return {
        ...state,
        student: action.student
      }
    case 'SET_CURRENT_USER_TYPE':
      return {
        ...state,
        currentUserType: action.currentUserType
      }
    default:
      return state
  }
}

export default ica
