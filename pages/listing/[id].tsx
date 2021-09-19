import React from "react";
import { useEffect, useState, useRef } from "react";
import {
    Button,
    Container,
    Divider,
    Flex,
    Grid,
    GridItem,
    Spinner,
    Box,
    Image,
    Square,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    LinkBox,
    LinkOverlay,
    AspectRatio
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "./card.module.css";
interface Listing {
    _id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    contact: string;
}

interface router {
    query: {
        id: string;
    };
}
import NavBar from "../../components/NavBar";

export default function Listing() {
    const router = useRouter();
    const [listing, setListing] = useState<Listing>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [listings, setListings] = useState<Listing[]>();
    const [error, setError] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = useRef<any>();
    useEffect(() => {
        fetch("/api/listing")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log(result);
                    setListings(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        console.log(getListing(router.query.id));
    }, []);

    useEffect(() => {
        setListing(getListing(router.query.id));
    }, [listings]);
    const getListing = (id: any) => {
        return listings?.filter((listing) => {
            return listing._id === id;
        })[0];
    };

    return !isLoaded ? (
        <>
            <Flex justifyContent="center" alignItems="center">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    // position="absolute"
                    // top="50%"
                    // left="50%"
                />
            </Flex>
        </>
    ) : (
        <>
            <NavBar />
            <Container width="90%" maxW="90%" mx="5%" my="50px" px="0">
                {/* <Navbar /> */}
                {listing !== undefined ? (
                    <Grid templateColumns="repeat(18, 1fr)" gap={50}>
                        <GridItem colSpan={7}>
                                <AspectRatio maxW="400px" ratio={1/1}>
                                <Image
                                    src={listing.image}
                                    alt={listing.name}
                                    fallbackSrc={
                                        "https://via.placeholder.com/450"
                                    }
                                    // boxSize={"450px"}
                                />
                                </AspectRatio>
                        </GridItem>
                        <GridItem colSpan={8}>
                            <Box>
                                <Box
                                    fontSize="3xl"
                                    fontWeight="medium"
                                    lineHeight="short"
                                >
                                    {listing.name}
                                </Box>
                                <Divider
                                    orientation="horizontal"
                                    color="#FF8C00"
                                    borderColor="#FF8C00"
                                    my="20px"
                                />
                                <Box
                                    fontSize="3xl"
                                    fontWeight="medium"
                                    color="#FF8C00"
                                >
                                    {listing.price !== undefined &&
                                        // rounds to two decimal points
                                        "$" +
                                            Number.parseFloat(
                                                listing.price.toString()
                                            ).toFixed(2)}
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
                                <Flex
                                    direction="column"
                                    flexGrow={1}
                                    maxW="120px"
                                >
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
                                        onClick={onOpen}
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
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {!error ? (
                        isLoaded && listings && listings.length > 0 ? (
                            listings.slice(0, 9).map((listing: Listing) => (
                                <LinkBox key={listing._id}>
                                <Box

                                    maxW="sm"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    m="10px"
                                    className={styles.card}
                                >
                                    <LinkOverlay href={`/listing/${listing._id}`}>
                                    </LinkOverlay>
                                    <AspectRatio maxW="400px" ratio={1/1}>
                                    <Image
                                        src={listing.image}
                                        alt="listing picture"
                                    ></Image>
                                    </AspectRatio>
                                    <Box p="3">
                                        <Box
                                            fontWeight="bold"
                                            fontSize="2xl"
                                            as="h2"
                                        >
                                            {listing.name}
                                        </Box>

                                        <Box>${listing.price}</Box>
                                    </Box>
                                </Box>
                                </LinkBox>
                            ))
                        ) : (
                            <Box>No items founds</Box>
                        )
                    ) : (
                        <Box>Error, please try again</Box>
                    )}
                </Grid>
                <Modal
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Contact Info</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Contact info: {listing? listing.contact: "loading"}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </>
    );
}
