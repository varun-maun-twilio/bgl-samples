import Head from 'next/head';
import {Anchor} from '@twilio-paste/core/anchor';
import {Heading} from '@twilio-paste/core/heading';
import {Box} from '@twilio-paste/core/box';
import {Paragraph} from '@twilio-paste/core/paragraph';
import {ListItem, UnorderedList} from '@twilio-paste/core/list';
import {Separator} from '@twilio-paste/core/separator';

const Home: React.FC = () => {
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Mock Dashboards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" variant="heading10">
       Mock Flex Dashboards
      </Heading>

    

      <Separator orientation="horizontal" verticalSpacing="space120" />

      <Heading as="h2" variant="heading20">
        Links
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="./agents" showExternal>
              Agents
            </Anchor>
          </Heading>  
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="./personas" showExternal>
              Personas
            </Anchor>
          </Heading>
        
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="./live-agents" showExternal>
              Live agents
            </Anchor>
          </Heading>
         <Paragraph>Show stats from redis cache</Paragraph>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Home;
