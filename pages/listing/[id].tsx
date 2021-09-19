import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Grid,
  GridItem,
  InputLeftElement,
  Input,
  InputGroup,
  Box,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Listing {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export default function Listing() {
  const router = useRouter();
  const [listing, setListing] = useState<Listing>();
  useEffect(() => {
    // setListing(getListing(router.query.id))
    setListing({
      id: "123123",
      name: "Good quality desk",
      image:
        "https://www.furnitureintherawtx.com/wp-content/uploads/2021/02/clearance1.jpg",
      description: "asdfjasdf",
      price: 29.945,
    });
  }, []);
  return (
    <>
      <Container width="100%" mx="5%" my="50px">
        {/* <Navbar /> */}
        {listing !== undefined ? (
          <Grid templateColumns="repeat(18, 1fr)" gap={50}>
            <GridItem colSpan={7}>
              <Image
                src={listing.image}
                alt={listing.name}
                fallbackSrc={"https://via.placeholder.com/450"}
                // boxSize={"450px"}
                boxSize="100%"
                mr="70px"
              />
            </GridItem>
            <GridItem colSpan={8}>
              <Box>
                <Box>{listing.name}</Box>
                <Box>
                  {listing.price !== undefined &&
                    // rounds to two decimal points
                    "$" +
                      Number.parseFloat(listing.price.toString()).toFixed(2)}
                </Box>
                <Box>{listing.description}</Box>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box>Claim</Box>
            </GridItem>
          </Grid>
        ) : (
          <Box>An error occurred, please try reloading the page.</Box>
        )}
        <Box mt="50px">Recommended Items</Box>
        {/* <Recommendations /> */}
      </Container>
    </>
  );
}
