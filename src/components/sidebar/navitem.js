import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavItem = ({ icon, children, name, url, ...rest }) => {
  const router = useRouter();
  const path = router?.pathname;
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={path === url ? "cyan.400" : null}
        color={path === url ? "white" : null}
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
