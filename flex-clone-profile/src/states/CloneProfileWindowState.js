const ACTION_OPEN_CLONE_PROFILE_WINDOW = 'DISMISS_OPEN_PROFILE_WINDOW';

const ACTION_DISMISS_CLONE_PROFILE_WINDOW = 'DISMISS_CLONE_PROFILE_WINDOW';

const initialState = {
  isOpen: false
};

export class Actions {
  static openCloneProfileWindow = () => ({ type: ACTION_OPEN_CLONE_PROFILE_WINDOW });
  static dismissCloneProfileWindow = () => ({ type: ACTION_DISMISS_CLONE_PROFILE_WINDOW });
}

export function reduce(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case ACTION_OPEN_CLONE_PROFILE_WINDOW: {
      return {
        ...state,
        isOpen: true,
        
      };
    }
    case ACTION_DISMISS_CLONE_PROFILE_WINDOW: {
      return {
        ...state,
        isOpen: false,
      };
    }

    default:
      return state;
  }
}
