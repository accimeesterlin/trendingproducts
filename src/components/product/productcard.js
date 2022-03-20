import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const IMAGE =
  "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

export default function ProductCard({ item }) {
  const router = useRouter();
  return (
    <Center py={12}>
      <Box
        role="group"
        p={6}
        maxW="330px"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        zIndex={1}
      >
        <Box
          rounded="lg"
          mt={-12}
          pos="relative"
          height="230px"
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded="lg"
            height={230}
            onClick={() => router.push(`/admin/product/${item?.productId}`)}
            width={282}
            objectFit="cover"
            src={item?.imageCover}
          />
        </Box>
        <Stack pt={10} align="center">
          <Text color="gray.500" fontSize="sm" textTransform="uppercase">
            {item?.storeName}
          </Text>
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {item?.title.slice(0, 20)}
          </Heading>
          <Stack direction="row" align="center">
            <Text fontWeight={800} fontSize="xl">
              $57
            </Text>
            <Text textDecoration="line-through" color="gray.600">
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
