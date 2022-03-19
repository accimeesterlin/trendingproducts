import React from "react";

import { Container } from "@chakra-ui/react";

import {
  Feature,
  NewsLetter,
  NavBar,
  Hero,
  Pricing,
  Testimonial,
} from "@Components/langingpage/";
import Footer from "@Components/common/footer";

export function HomePage() {
  return (
    <Container maxW="container.xl">
      <NavBar />
      <Hero />
      <Feature />
      <Pricing />
      <Testimonial />
      <NewsLetter />
      <Footer />
    </Container>
  );
}

export default HomePage;
