import React from 'react';
import { Manager } from '@twilio/flex-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './styles.css'
  class CloneProfileWindow extends React.Component {

    state = {
        allWorkerList:[],
        filteredWorkerList: [],
        selectedWorkerList:[]
      };


      handleToggleWorker = value => () => {
        const { selectedWorkerList } = this.state;
        const currentIndex = selectedWorkerList.indexOf(value);
        const newChecked = [...selectedWorkerList];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({
          selectedWorkerList: newChecked,
        });
      }; 
      
    componentDidMount() {
        const $this = this;
        fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/listWorkers`).then(d=>d.json()).then(wlist=>{
          $this.setState({
            allWorkerList:wlist,
            filteredWorkerList:wlist,
            selectedWorkerList:[]
          })
        })

    }

    cloneSkills = async()=>{
        const sourceWorkerSid = Manager.getInstance().store.getState().flex.view.selectedWorkerInSupervisorSid;
        const targerWorkerSidList =  this.state.selectedWorkerList;

        const payload = {
          sourceWorkerSid,
          targerWorkerSidList
        };

        await fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/cloneSkills`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(e=>{
          console.error(e);
        })
       
       alert('Success');
       this.props.dismissCloneProfileWindow();
    }


  
  render(){

    const $this = this;
  
  if (!this.props.isOpen) {
    return null;
  }

  return (
    <div className={'cloneSkillModalWindow'} >

    <div className={'cloneSkillsContentWrap'}>

      <div className={'cloneSkillsTitle'}>
        <h4>Clone Skills</h4>
      </div>

      <div className={'cloneSkillsListWrap'} >

      <List dense={true}>
        {this.state.filteredWorkerList.map(w => (
          <ListItem key={w.sid} role={undefined} dense button divider={true} onClick={$this.handleToggleWorker(w.sid)}>
            <Checkbox
              checked={this.state.selectedWorkerList.indexOf(w.sid) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={w.friendlyName} />
          </ListItem>
        ))}
      </List>


      </div>

      
          <div className={"cloneSkillsFooter"}>
                <Button color={'primary'}  onClick={()=>this.cloneSkills()}>Clone Skills</Button>
                <Button color={'secondary'} onClick={()=>this.props.dismissCloneProfileWindow()}>Close</Button>
          </div>


    </div>



    </div>


  );
  }
};


export default CloneProfileWindow;
