import * as React from "react";
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
import { Card } from '@twilio-paste/core/card';
import { SearchIcon } from "@twilio-paste/icons/cjs/SearchIcon";
import { LoadingIcon } from "@twilio-paste/icons/cjs/LoadingIcon";
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Modal, ModalBody, ModalFooter, ModalFooterActions, ModalHeader, ModalHeading } from '@twilio-paste/core/modal';

import {
    DataGrid,
    DataGridHead,
    DataGridRow,
    DataGridHeader,
    DataGridBody,
    DataGridCell
} from "@twilio-paste/core/data-grid";

const AGENT_SKILLS = ['FNOL', 'SKILL1', 'SKILL2'];
const AGENT_STATUS = ['Offline', 'On a call', 'Available for call'];
const AGENT_PERSONAS = ['FNOL-RESPONSE', 'HOME', 'MOTOR'];
const PERSONA_UTLIZATION = ['High', 'Moderate', 'Low'];
const personaList = [
    {
        ref: 1,
        name: 'Persona 1',
        allocatedResources: 10,
        eligibleResources: 5,
        currentUtilization: '60%'
    },
    {
        ref: 2,
        name: 'Persona 2',
        allocatedResources: 10,
        eligibleResources: 5,
        currentUtilization: '60%'
    },
    {
        ref: 3,
        name: 'Persona 3',
        allocatedResources: 10,
        eligibleResources: 5,
        currentUtilization: '60%'
    },
    {
        ref: 4,
        name: 'Persona 4',
        allocatedResources: 10,
        eligibleResources: 5,
        currentUtilization: '60%'
    },
    {
        ref: 5,
        name: 'Persona 5',
        allocatedResources: 10,
        eligibleResources: 5,
        currentUtilization: '60%'
    },
    {
        ref: 6,
        name: 'Persona 6',
        allocatedResources: 10,
        eligibleResources: 5,
        currentUtilization: '60%'
    }
];



const agentList = [
    {
        code: 1,
        name: 'Varun',
        assignedPersona: 'FNOL',
        skills: ['skillA', 'skillB'],
        status: 'on a call'
    },
    {
        code: 2,
        name: 'Ivan',
        assignedPersona: 'FNOL',
        skills: ['skillA', 'skillB'],
        status: 'available'
    },
    {
        code: 3,
        name: 'Richard',
        assignedPersona: 'FNOL',
        skills: ['skillA', 'skillB'],
        status: 'available'
    },
    {
        code: 4,
        name: 'Anthony',
        assignedPersona: 'FNOL',
        skills: ['skillA', 'skillB'],
        status: 'available'
    }
];



const CheckboxCell = ({
    onClick,
    id,
    indeterminate,
    checked,
    label
}) => {
    const checkboxRef = React.createRef();

    const handleClick = React.useCallback(() => {
        if (checkboxRef.current == null) {
            return;
        }
        return onClick(!checkboxRef.current.checked);
    }, [onClick, checkboxRef]);
    const handleKeyDown = React.useCallback(
        (event) => {
            if (checkboxRef.current == null) {
                return;
            }
            if (event.keyCode === 32 || event.keyCode === 13) {
                return onClick(!checkboxRef.current.checked);
            }
        },
        [onClick, checkboxRef]
    );

    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleClick}
            cursor="pointer"
        >
            <Box marginLeft="space20">
                <Checkbox
                    id={id}
                    checked={checked}
                    onKeyDown={handleKeyDown}
                    ref={checkboxRef}
                    indeterminate={indeterminate}
                >
                    <ScreenReaderOnly>{label}</ScreenReaderOnly>
                </Checkbox>
            </Box>
        </Box>
    );
};


function Personas() {


    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (

        <Box paddingX={20} paddingY={10}>

            <Stack orientation="vertical" spacing="space40">
                <Heading as="h1" variant="heading10">
                    Personas
                </Heading>






                <Disclosure visible={true} variant={"contained"}>
                    <DisclosureHeading as="h2" variant="heading20">
                        Filters
                    </DisclosureHeading>
                    <DisclosureContent >
                        <Stack orientation="vertical" spacing="space40">
                            <Grid gutter="space40">
                                <Column>
                                    <Box>

                                        <Label htmlFor="agent-filter">
                                            Persona Name
                                        </Label>
                                        <Input aria-describedby="agent-filter-text" id="agent-filter" name="agent-filter" type="text" placeholder="" />
                                        <HelpText id="agent-filter-text">Search by agent name</HelpText>
                                    </Box>
                                </Column>

                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={PERSONA_UTLIZATION} labelText="Utilization" helpText="Search by current utilization" />

                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_SKILLS} labelText="Skills" helpText="Search by agent skills" />

                                    </Box>
                                </Column>


                            </Grid>

                            <Grid gutter="space40">


                                <Column>

                                </Column>
                                <Column>

                                </Column>
                                <Column>

                                    <Flex hAlignContent="right" vAlignContent="center" height="100%">
                                        <Stack orientation="horizontal" spacing="space60">
                                            <Button variant="primary" onClick={() => { }}>
                                                <SearchIcon decorative={false} title="Search Agents" /> Search
                                            </Button>
                                            <Button variant="secondary" onClick={() => { }}>
                                                Reset
                                            </Button>
                                        </Stack>
                                    </Flex>

                                </Column>

                            </Grid>




                        </Stack>

                    </DisclosureContent>
                </Disclosure>


                <DataGrid aria-label="User information table" striped width={'100%'}>
                    <DataGridHead >

                        <DataGridRow >

                            <DataGridHeader >

                                <Flex hAlignContent="right" >

                                    <Stack orientation="horizontal" spacing="space40">
                                        <Text>Last updated at {new Date().toUTCString()}</Text>
                                        <Button variant={"secondary"}><LoadingIcon title="refresh"></LoadingIcon> Refresh</Button>
                                    </Stack>
                                </Flex>
                            </DataGridHeader>
                        </DataGridRow>
                    </DataGridHead>
                </DataGrid>


                <Grid gutter="space30" equalColumnHeights  >



                    {
                        personaList.map((p, pIndex) => <Column span={3} >
                            <Card padding="space90" key={`cardIndex-${pIndex}`} >
                                <Heading as="h2" variant="heading20">
                                    {p.name}
                                </Heading>
                                <Stack orientation="horizontal" spacing="space190" >
                                    <Stack orientation="vertical" spacing="space40" >
                                        <Label>Allocated</Label>
                                        <Text fontSize="fontSize90" fontWeight="fontWeightBold" >{p.allocatedResources}</Text>
                                    </Stack>

                                    <Stack orientation="vertical" spacing="space40" >
                                        <Label>Eligible</Label>
                                        <Text fontSize="fontSize90" fontWeight="fontWeightBold" >{p.eligibleResources}</Text>
                                    </Stack>


                                    <Stack orientation="vertical" spacing="space40" >
                                        <Label>Utilization</Label>
                                        <Text color={"colorTextError"} fontSize="fontSize90" fontWeight="fontWeightBold" >{p.currentUtilization}</Text>
                                    </Stack>

                                </Stack>

                                <Flex hAlignContent="right" marginTop="space90">
                                    <Button variant="primary" onClick={handleOpen} >Explore</Button>
                                </Flex>


                            </Card>
                        </Column>)
                    }



                </Grid>

            </Stack>


            <Modal size="wide" isOpen={isModalOpen} onDismiss={handleClose} >
                <ModalHeader>
                    <ModalHeading as="h3" >
                        Persona Details
                    </ModalHeading>
                </ModalHeader>
                <ModalBody >

                    <Flex hAlignContent="center">

                    <Stack orientation="horizontal" spacing="space190" >

                        <Stack orientation="vertical" spacing="space40">
                            <Heading variant="heading40">Current Participants</Heading>
                            <DataGrid>
                                <DataGridHead >

                                    <DataGridRow >

                                        <DataGridHeader>
                                            <CheckboxCell
                                                onClick={(checked) => {
                                                }}


                                                label={`Toggle Select All `}
                                            />

                                        </DataGridHeader>
                                        <DataGridHeader >Sr No</DataGridHeader>
                                        <DataGridHeader >Name</DataGridHeader>

                                    </DataGridRow>
                                </DataGridHead >




                                <DataGridBody>
                                    {agentList.map((row, rowIndex) => (
                                        <DataGridRow key={"row-" + rowIndex}>
                                            <DataGridCell>
                                                <CheckboxCell
                                                    onClick={(checked) => {
                                                    }}


                                                    label={`Select agent ${row.name}`}
                                                />
                                            </DataGridCell>
                                            <DataGridCell >
                                                {rowIndex + 1}
                                            </DataGridCell>
                                            <DataGridCell >
                                                {row.name}
                                            </DataGridCell>
                                        </DataGridRow>
                                    ))}
                                </DataGridBody>


                            </DataGrid>
                        </Stack>


                        <Flex vertical={true} vAlignContent={"center"} hAlignContent={"center"} wrap>
                                            
                                            <Button  variant="secondary"  >Move All {'>>'} </Button>
                                            <br />
                                            <Button style={{marginBottom:20}} variant="secondary"  >Move Selected {'>'} </Button>
                                            <br />
                                            <Button style={{marginBottom:20}} variant="secondary"  >Move All {'<<'} </Button>
                                            <br />
                                            <Button style={{marginBottom:20}} variant="secondary"  >Move Selected {'<'} </Button>

                            </Flex>


                        <Stack orientation="vertical" spacing="space40">
                            <Heading variant="heading40">Eligible Participants</Heading>
                            <DataGrid>
                                <DataGridHead >

                                    <DataGridRow >

                                        <DataGridHeader>
                                            <CheckboxCell
                                                onClick={(checked) => {
                                                }}


                                                label={`Toggle Select All `}
                                            />

                                        </DataGridHeader>
                                        <DataGridHeader >Sr No</DataGridHeader>
                                        <DataGridHeader >Name</DataGridHeader>

                                    </DataGridRow>
                                </DataGridHead >




                                <DataGridBody>
                                    {agentList.map((row, rowIndex) => (
                                        <DataGridRow key={"row-" + rowIndex}>
                                            <DataGridCell>
                                                <CheckboxCell
                                                    onClick={(checked) => {
                                                    }}


                                                    label={`Select agent ${row.name}`}
                                                />
                                            </DataGridCell>
                                            <DataGridCell >
                                                {rowIndex + 1}
                                            </DataGridCell>
                                            <DataGridCell >
                                                {row.name}
                                            </DataGridCell>
                                        </DataGridRow>
                                    ))}
                                </DataGridBody>


                            </DataGrid>
                        </Stack>

                    </Stack>

                                                    </Flex>

                </ModalBody>
                <ModalFooter>
                    <ModalFooterActions>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooterActions>
                </ModalFooter>
            </Modal>


        </Box>
    )
}

export default Personas