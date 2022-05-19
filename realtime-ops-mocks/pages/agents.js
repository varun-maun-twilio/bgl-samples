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
import { SearchIcon } from "@twilio-paste/icons/cjs/SearchIcon";
import { LoadingIcon } from "@twilio-paste/icons/cjs/LoadingIcon";

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


function Agents() {
    return (

        <Box paddingX={20} paddingY={10}>

            <Stack orientation="vertical" spacing="space40">
                <Heading as="h1" variant="heading10">
                    Agents
                </Heading>



                <Disclosure  variant={"contained"}>
                    <DisclosureHeading as="h2" variant="heading20">
                        Saved Queries
                    </DisclosureHeading>
                    <DisclosureContent >
                        <Stack orientation="vertical" spacing="space40">
                            <Grid gutter="space40">
                                <Column>
                                    <Box>
                                    <Button variant="link" >
                                        Group 1
                                    </Button>
                                    </Box>
                                </Column>

                                <Column>
                                    <Box>
                                    <Button variant="link" >
                                        Group 2
                                    </Button>
                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                    <Button variant="link" >
                                        Group 3
                                    </Button>
                                    </Box>
                                </Column>


                            </Grid>
                            <Grid gutter="space40">
                                <Column>
                                    <Box>
                                    <Button variant="link" >
                                        Group 4
                                    </Button>
                                    </Box>
                                </Column>

                                <Column>
                                    <Box>
                                    <Button variant="link" >
                                        Group 5
                                    </Button>
                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                    <Button variant="link" >
                                        Group 6
                                    </Button>
                                    </Box>
                                </Column>


                            </Grid>
                           
                        </Stack>

                    </DisclosureContent>
                </Disclosure>


                <Disclosure visible={true} variant={"contained"}>
                    <DisclosureHeading as="h2" variant="heading20">
                        Advanced Filters
                    </DisclosureHeading>
                    <DisclosureContent >
                        <Stack orientation="vertical" spacing="space40">
                            <Grid gutter="space40">
                                <Column>
                                    <Box>

                                        <Label htmlFor="agent-filter">
                                            Agent Name
                                        </Label>
                                        <Input aria-describedby="agent-filter-text" id="agent-filter" name="agent-filter" type="text" placeholder="" />
                                        <HelpText id="agent-filter-text">Search by agent name</HelpText>
                                    </Box>
                                </Column>

                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_STATUS} labelText="Agent Status" helpText="Search by latest agent status" />

                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_SKILLS} labelText="Trained Skills" helpText="Search by agent skills" />

                                    </Box>
                                </Column>


                            </Grid>
                            <Grid gutter="space40">
                              

                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_STATUS} labelText="Brand" helpText="Search by Brand" />

                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_STATUS} labelText="Service" helpText="Search by Service" />

                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_STATUS} labelText="Product" helpText="Search by Product" />

                                    </Box>
                                </Column>


                            </Grid>

                            <Grid gutter="space40">


                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_PERSONAS} labelText="Assigned Personas" helpText="Search by currently assigned persona" />

                                    </Box>
                                </Column>
                                <Column>
                                    <Box>
                                        <Combobox autocomplete items={AGENT_PERSONAS} labelText="Eligible Personas" helpText="Search by eligible persona not currently assigned" />

                                    </Box>
                                </Column>
                                <Column>

                                    <Flex hAlignContent="right" vAlignContent="center" height="100%">
                                        <Stack orientation="horizontal" spacing="space60">
                                            <Button variant="primary" onClick={() => { }}>
                                                <SearchIcon decorative={false} title="Search Agents" /> Search
                                            </Button>
                                            <Button variant="secondary" onClick={() => { }}>
                                                Save as Query
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

                                <Flex hAlignContent="between" >
                                    <Stack orientation="horizontal" spacing="space40">
                                        <Text>4 Results Found</Text>
                                      <Button variant={"secondary"} disabled={true} >Bulk Update Skills</Button>
                                    </Stack>

                                    <Stack orientation="horizontal" spacing="space40">
                                        <Text>Last updated at {new Date().toUTCString()}</Text>
                                        <Button variant={"secondary"}><LoadingIcon title="refresh"></LoadingIcon> Refresh</Button>
                                    </Stack>
                                </Flex>
                            </DataGridHeader>
                        </DataGridRow>
                    </DataGridHead>
                </DataGrid>


                <DataGrid aria-label="User information table" striped width={'100%'}>
                    <DataGridHead >

                        <DataGridRow >
                            <DataGridHeader>
                                <CheckboxCell
                                    onClick={(checked) => {
                                    }}


                                    label={`Toggle Select All `}
                                />

                            </DataGridHeader>
                            <DataGridHeader>Sr No</DataGridHeader>
                            <DataGridHeader>Agent Name</DataGridHeader>
                            <DataGridHeader>Assigned Functions</DataGridHeader>
                           
                            
                            <DataGridHeader>Current Status</DataGridHeader>
                        </DataGridRow>
                    </DataGridHead>
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
                                <DataGridCell >
                                    {row.assignedPersona}
                                </DataGridCell>
                               
                                <DataGridCell >
                                    {row.status}
                                </DataGridCell>
                            </DataGridRow>
                        ))}
                    </DataGridBody>
                </DataGrid>

            </Stack>
        </Box>
    )
}

export default Agents