export default (state = {}, action) => {
  switch (action.type) {
    /*-------------------------------- TIPS --------------------------------*/
    case 'UPDATE_TIPS':
      return {
        tips: action.tips
      };
    default:
      return state;
  }
};