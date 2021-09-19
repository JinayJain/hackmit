import React from "react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import {
    Container,
    InputLeftElement,
    Input,
    InputGroup,
    Box,
    Image,
    Grid,
    Stack,
    HStack,
    LinkBox,
    LinkOverlay,
    Spinner,
    AspectRatio
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Fuse from "fuse.js";
import styles from "./gallery.module.css";
import NavBar from "../../components/NavBar";

interface Listing {
    _id: string;
    name: string;
    price: number;
    college: string;
    description: string;
    image: string;
}
const getArraysIntersection = (a1: Array<string>, a2: Array<string>) => {
    return a1.filter(function (n: any) {
        return a2.indexOf(n) !== -1;
    });
};

const Gallery: NextPage = () => {
    const [listingData, setListingData] = useState<Listing[]>([]);
    // const [filtered, setFiltered] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [priceMax, setPriceMax] = useState(400);
    const [priceMin, setPriceMin] = useState(0);
    const [college, setCollege] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [advancedFiltered, setAdvancedFiltered] = useState<Listing[]>([]);
    useEffect(() => {
        fetch("/api/listing")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    //   console.log(result);
                    setListingData(result);
                    setAdvancedFiltered(result);
                    console.log(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    useEffect(() => {
        // console.log(advancedFiltered);
    }, [advancedFiltered]);

    const search = (
        priceMinSearch?: any,
        priceMaxSearch?: any,
        queryString?: string,
        collegeString?: string
    ) => {
        if (!priceMinSearch) {
            priceMinSearch = 0;
        }

        if (!priceMaxSearch) {
            priceMaxSearch = 400;
        }
        console.log(priceMaxSearch);
        console.log(queryString);

        const searchOptions = {
            includeScore: true,
            keys: ["name", "description"],
        };

        const searchCollege = {
            includeScore: true,
            keys: ["college"],
        };

        if (isLoaded) {
            const fuse = new Fuse(listingData, searchOptions);
            let result = listingData.map((listing: Listing) => listing._id);
            if (queryString && queryString.length > 0) {
                const searchResult = fuse
                    .search(queryString)
                    .map((x: any) => x.item._id);
                console.log(searchResult);
                result = getArraysIntersection(result, searchResult);
            }
            let priceResult = [];
            let collegeResult = [];
            if (collegeString && collegeString !== "") {
                const collegeFuse = new Fuse(listingData, searchCollege);
                collegeResult = collegeFuse
                    .search(collegeString)
                    .map((x: any) => x.item._id);
                result = getArraysIntersection(result, collegeResult);
            }

            if (priceMaxSearch !== 400 || priceMinSearch !== 0) {
                priceResult = listingData
                    .filter((listing) => {
                        return (
                            listing.price <= priceMaxSearch &&
                            listing.price >= priceMinSearch
                        );
                    })
                    .map((listing: Listing) => listing._id);
                // console.log(priceResult);
                result = getArraysIntersection(result, priceResult);
            }
            console.log(result);

            setAdvancedFiltered(
                listingData.filter((listing: Listing) => {
                    return result.includes(listing._id);
                })
            );
        }
    };

    const findCollege = (e: any) => {
        setCollege(e.target.value);
        search(priceMin, priceMax, query, e.target.value);
    };

    const findMinPrice = (e: any) => {
        if (!e.target.value) {
            setPriceMin(0);
            search(0, priceMax, query, college);
        } else {
            setPriceMin(parseFloat(e.target.value));
            search(parseFloat(e.target.value), priceMax, query, college);
        }
    };

    const findMaxPrice = (e: any) => {
        if (!e.target.value) {
            setPriceMax(400);
            search(priceMin, 400, query, college);
        } else {
            setPriceMax(parseFloat(e.target.value));
            search(priceMin, parseFloat(e.target.value), query, college);
        }
    };

    const findQuery = (e: any) => {
        search(priceMin, priceMax, e.target.value, college);
        setQuery(e.target.value);
    };

    return (
        <>
            <NavBar></NavBar>
            <Container maxW="container.lg">
                <Box w="100px"></Box>
                <Box mt="50px" mb="30px" mx="10px">
                    <HStack>
                        <InputGroup style={{ borderColor: "#FFC176" }}>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="gray.400" />
                            </InputLeftElement>
                            <Input
                                type="search"
                                w="1xl"
                                focusBorderColor="#FFC176"
                                placeholder="Search for item"
                                onChange={findQuery}
                            ></Input>
                        </InputGroup>
                        <Input
                            style={{ borderColor: "#FFC176" }}
                            focusBorderColor="#FFC176"
                            type="number"
                            w="1sm"
                            onChange={findMinPrice}
                            placeholder="Min Price"
                        ></Input>
                        <Input
                            style={{ borderColor: "#FFC176" }}
                            focusBorderColor="#FFC176"
                            type="number"
                            w="1sm"
                            onChange={findMaxPrice}
                            placeholder="Max Price"
                        ></Input>
                        <Input
                            style={{ borderColor: "#FFC176" }}
                            focusBorderColor="#FFC176"
                            type="search"
                            w="1xl"
                            onChange={findCollege}
                            placeholder="University"
                        ></Input>
                    </HStack>
                </Box>

                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {/* {console.log(advancedFiltered)} */}
                    {!error ? (
                        isLoaded ? (
                            advancedFiltered.length > 0 ? (
                                advancedFiltered.map((listing: Listing) => (
                                    <LinkBox key={listing._id}>
                                        <Box
                                            maxW="sm"
                                            borderWidth="1px"
                                            borderRadius="lg"
                                            overflow="hidden"
                                            m="10px"
                                            className={styles.card}
                                        >
                                            <LinkOverlay
                                                href={`/listing/${listing._id}`}
                                            ></LinkOverlay>
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
                            <Box>
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                />
                            </Box>
                        )
                    ) : (
                        <Box>Error, please try again</Box>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default Gallery;
