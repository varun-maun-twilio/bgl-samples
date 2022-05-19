import React from 'react';
import Button from '@material-ui/core/Button';

// It is recommended to keep components stateless and use redux for managing states
const OpenCloneProfileButton = (props) => {
  

  return (
    <Button color='primary' onClick={()=>props.openCloneProfileWindow()}>Clone Skills</Button>
  );
};


export default OpenCloneProfileButton;
