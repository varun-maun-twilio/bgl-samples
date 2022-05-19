# BGL Samples Repo

This is a repo for the sample code / mocks for BGL  
There are 2 major components:

## 1. Clone Porfile

The clone profile functionality is enabled by:

1. A Flex Plugin (flex-clone-profile) for the UI
2. Serverless Project (clone-profile-service) that hosts twilio functions to enable the functionality


## 2. Custom Agent Dashbords

The custom agent dashboards consist of:

1. A Next.js application with Twilio Paste Components for the UI
2. A node.js application that can mock event streams data to enable the UI using a Redis Cache