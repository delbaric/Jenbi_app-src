export default (state = {}, action) => {
  switch (action.type) {
    /*-------------------------------- AUTH --------------------------------*/
    case 'LOGIN':
      return {
        expoPushToken: action.expoPushToken,
        uid: action.uid,
        profile: action.profile,
        lastUpdate: action.lastUpdate,
        treats: action.treats,
        walks: action.walks
      };
    case 'LOGOUT':
      return {
        ...state,
        uid: ''
      };
    /*-------------------------------- LAST UPDATE --------------------------------*/
    case 'SET_LAST_UPDATE':
      return {
        ...state, 
        lastUpdate: action.timeToSetInDataBase
      }
    /*-------------------------------- TREATS --------------------------------*/
    case 'UPDATE_TREATS':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        treats: action.treats
      }
    /*-------------------------------- WALKS --------------------------------*/
    case 'UPDATE_WALKS':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        walks: action.walks
      }
    /*-------------------------------- PROFILE --------------------------------*/
    case 'UPDATE_PROFILE':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        profile: action.profile
      }
      /*-------------------------------- DEFAULT --------------------------------*/
    default:
      return state;
  }
};