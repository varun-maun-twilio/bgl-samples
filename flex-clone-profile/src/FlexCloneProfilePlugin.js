import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CloneProfileWindowContainer from './components/CloneProfileWindow/CloneProfileWindow.Container';
import OpenCloneProfileButton from './components/OpenCloneProfileButton/OpenCloneProfileButton.Container'
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'FlexCloneProfilePlugin';

export default class FlexCloneProfilePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  
  async init(flex, manager) {
    this.registerReducers(manager);

    flex.WorkerCanvas.Content.add(
      <OpenCloneProfileButton key="openCloneProfileBtn"></OpenCloneProfileButton>
     )
 
       flex.TeamsView.Content.add(
         <CloneProfileWindowContainer key="cloneProfileContainerWindow" />,
       )

   }

  
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
