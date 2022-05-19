import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/CloneProfileWindowState';
import OpenCloneProfileButton from './OpenCloneProfileButton';

const mapStateToProps = (state) => ({
  isOpen: state['flex-clone-profile'].cloneProfile.isOpen,
  selectedWorkerId: state['flex-clone-profile'].cloneProfile.selectedWorkerId
});

const mapDispatchToProps = (dispatch) => ({
  openCloneProfileWindow: bindActionCreators(Actions.openCloneProfileWindow, dispatch),
  dismissCloneProfileWindow: bindActionCreators(Actions.dismissCloneProfileWindow, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCloneProfileButton);
