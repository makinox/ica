const ica = (state = {
  fines: [],
  currentUserData: {},
  student: {},
  show: false
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
    case 'SET_CURRENT_USER_DATA':
      return {
        ...state,
        currentUserData: action.currentUserData
      }
    case 'CHANGE_SHOW_FORM':
      return {
        ...state,
        show: action.show
      }
    case 'FILTER_ITEM_FROM_FINE_LIST':
      return {
        ...state,
        fines: state.fines.filter(fine => fine._id !== action._id)
      }
    default:
      return state
  }
}

export default ica
