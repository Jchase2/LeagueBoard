import React, { useState, useEffect } from 'react';
import mockScrimmage from './mockdata';
import { IPlayer } from './MockInterface';
import { Box, Divider, Container, SimpleGrid, Flex, Spacer, Center, Square, Circle, Wrap, WrapItem} from "@chakra-ui/react";
import PredictionsGraph from './Graphs/PredictionsGraph';
import DonutGraph from './Graphs/DonutGraph';
import { ScrimmageTable } from './ScrimmageTable';
import SidebarWithHeader from '../../../components/Heading/Heading';


export const ScrimLayout = () => {
  
  
  
  return (
    <div>

      <Center>
        <Flex>
          <Box>
            <ScrimmageTable />
          </Box>
        </Flex>
      </Center>

      <Divider orientation="horizontal"/>
      
      <Center>
        <Container>
          <PredictionsGraph />
        </Container>
      </Center>

    </div>
  );
}