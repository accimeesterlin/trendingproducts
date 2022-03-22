import React from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

const Feature = ({ title, text, icon }) => (
  <Stack>
    <Flex
      w={16}
      h={16}
      align="center"
      justify="center"
      color="white"
      rounded="full"
      bg="gray.100"
      mb={1}
    >
      {icon}
    </Flex>
    <Text fontWeight={600}>{title}</Text>
    <Text color="gray.600">{text}</Text>
  </Stack>
);

export default function SimpleThreeColumns() {
  return (
    <Box p={4} id="feature">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title="Discover In Demand Products"
          text="We are manually adding winning products, every day.
          Stop wasting money on bad products!"
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title="Save Products For Later"
          text="Build your winning product testing library. Click once on the heart on the product page and it will be saved to your “Saved” tab"
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title="Search Products"
          text="Type in the name of a product or search it by AliExpress URL to let us analyze all the sexy stats"
        />
      </SimpleGrid>
    </Box>
  );
}
