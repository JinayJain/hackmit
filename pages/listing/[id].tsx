import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  InputLeftElement,
  Input,
  InputGroup,
  Box,
  Image,
  Square,
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
      description: `asdfjasdf. asl;jfa;sldkjf;lkasdf /asdf as;ldkfja;lskdjf;lasdf./asd/fas dflkjasdf
      a;lksdf;alskdjf;lakjas;ldkj;lkajsdf;lkjsad;lkjfas
      asdfl;kasdjf;laksdjf;laksd;lfasdklvnkejwfnbkwefnvkwevkjewdfnskjvsdfnjkvdfsv
      sdffjksdnjknrwklbnkljnfkjvkljdnvkljdsfsnvks
      alksdjfalskjdnfas
      asdfjasdlkfjasdlkjfas
      asdfalskjdfa`,
      price: 29.945,
    });
  }, []);
  return (
    <>
      <Container width="90%" maxW="90%" mx="5%" my="50px" px="0">
        {/* <Navbar /> */}
        {listing !== undefined ? (
          <Grid templateColumns="repeat(18, 1fr)" gap={50}>
            <GridItem colSpan={7}>
              <Square size="100%" mr="70px" alignItems="start">
                <Image
                  src={listing.image}
                  alt={listing.name}
                  fallbackSrc={"https://via.placeholder.com/450"}
                  // boxSize={"450px"}
                />
              </Square>
            </GridItem>
            <GridItem colSpan={8}>
              <Box>
                <Box fontSize="3xl" fontWeight="medium" lineHeight="short">
                  {listing.name}
                </Box>
                <Divider
                  orientation="horizontal"
                  color="#FF8C00"
                  borderColor="#FF8C00"
                  my="20px"
                />
                <Box fontSize="3xl" fontWeight="medium" color="#FF8C00">
                  {listing.price !== undefined &&
                    // rounds to two decimal points
                    "$" +
                      Number.parseFloat(listing.price.toString()).toFixed(2)}
                </Box>
                <Divider
                  orientation="horizontal"
                  color="#FF8C00"
                  borderColor="#FF8C00"
                  my="20px"
                />
                <Box>{listing.description}</Box>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Flex direction="row" justifyContent="flex-end">
                <Flex direction="column" flexGrow={1} maxW="120px">
                  {/* <Box> */}
                  <Button
                    mb="12px"
                    bg="#FF9B21"
                    _hover={{ bg: "#FF8C00" }}
                    _active={{
                      bg: "#FF8C00",
                      boxShadow:
                        "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                    }}
                    _focus={{ bg: "#FF8C00" }}
                  >
                    Claim
                  </Button>
                  <Button mb="12px" bg="#CED4DC">
                    Share
                  </Button>
                  <Button bg="#CED4DC">Save</Button>
                  {/* </Box> */}
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        ) : (
          <Box>An error occurred, please try reloading the page.</Box>
        )}
        <Box mt="50px" fontSize="3xl" fontWeight="medium">
          Recommended Items
        </Box>
        {/* <Recommendations /> */}
      </Container>
    </>
  );
}
