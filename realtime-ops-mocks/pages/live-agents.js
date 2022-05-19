import * as React  from "react";
import {useEffect,useState} from "react";
import { ScreenReaderOnly } from "@twilio-paste/core/screen-reader-only";
import { Flex } from "@twilio-paste/core/flex"
import { Text } from '@twilio-paste/text';
import { Box } from "@twilio-paste/core/box";
import { CheckboxGroup, Checkbox } from "@twilio-paste/core/checkbox";
import { useUIDSeed } from "@twilio-paste/core/uid-library";
import { Stack } from '@twilio-paste/core/stack';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Disclosure, DisclosureHeading, DisclosureContent } from '@twilio-paste/core/disclosure';
import { Heading } from '@twilio-paste/core/heading';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import { HelpText } from '@twilio-paste/core/help-text';
import { Combobox } from '@twilio-paste/core/combobox';
import { Button } from '@twilio-paste/core/button';
import { SearchIcon } from "@twilio-paste/icons/cjs/SearchIcon";
import { LoadingIcon } from "@twilio-paste/icons/cjs/LoadingIcon";
import {Card} from '@twilio-paste/core/card';
import {useInterval} from '../utils'
function LiveAgents() {


    const [liveWorkerStats,setLiveWorkerStats] = useState({});

    const loadWorkerStats = async ()=>{
        fetch('http://localhost:8888/')
        .then((res) => res.json())
        .then((data) => {
          setLiveWorkerStats(data);
        }).catch(e=>{})
    }

    useInterval(() => {
        loadWorkerStats();
      }, 1000 * 2);

    useEffect(() => {
        
        loadWorkerStats();
      
      }, [])
    return (

        <Box paddingX={20} paddingY={10}>

            <Stack orientation="vertical" spacing="space40">
                <Heading as="h1" variant="heading10">
                    Monitor Live Agents
                </Heading>




                <Stack orientation="horizontal" spacing="space40">

          


      <Card  padding="space120">
      <Heading as="h2" variant="heading30">Available</Heading>
      <Heading as="h1" variant="heading20">{liveWorkerStats['Available']|| 'N/A'}</Heading>
      </Card>

      <Card  padding="space120">
      <Heading as="h2" variant="heading30">On A Call</Heading>
      <Heading as="h1" variant="heading20">{liveWorkerStats['On a call']|| 'N/A'}</Heading>
      </Card>

      <Card  padding="space120">
      <Heading as="h2" variant="heading30">Initialized</Heading>
      <Heading as="h1" variant="heading20">{liveWorkerStats['created']|| 'N/A'}</Heading>
      </Card>

      <Card  padding="space120">
      <Heading as="h2" variant="heading30">Offline</Heading>
      <Heading as="h1" variant="heading20">{liveWorkerStats['Offline']|| 'N/A'}</Heading>
      </Card>
                
                </Stack>

                

            </Stack>
        </Box>
    )
}

export default LiveAgents