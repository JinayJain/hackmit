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
  Flex,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Fuse from "fuse.js";
import styles from "./gallery.module.css";

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

const getTripleArraysIntersection = (
  a1: Array<string>,
  a2: Array<string>,
  a3: Array<string>
) => {
  if (a1.length > 0 && a2.length > 0 && a3.length > 0) {
    let intersect1 = getArraysIntersection(a1, a2);
    return getArraysIntersection(intersect1, a3);
  } else if (a1.length == 0 && a2.length == 0 && a3.length == 0) {
    return [];
  } else {
    if (a1.length > 0 && a2.length > 0) {
      return getArraysIntersection(a1, a2);
    } else if (a1.length > 0 && a3.length > 0) {
      return getArraysIntersection(a1, a3);
    } else if (a2.length > 0 && a3.length > 0) {
      return getArraysIntersection(a2, a3);
    } else {
      if (a1.length > 0) {
        return a1;
      } else if (a2.length > 0) {
        return a2;
      } else {
        return a3;
      }
    }
  }
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
          console.log(result);
          setListingData(result);
          setAdvancedFiltered(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    console.log(advancedFiltered);
  }, [advancedFiltered]);

  const search = (priceMinSearch?: any, priceMaxSearch?: any) => {
    if (!priceMinSearch) {
      priceMinSearch = 0;
    }

    if (!priceMaxSearch) {
      priceMaxSearch = 400;
    }

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
      let result = [];
      const searchResult = fuse.search(query).map((x: any) => x.item._id);
      let priceResult = [];
      let collegeResult = [];
      if (college !== "") {
        const collegeFuse = new Fuse(listingData, searchCollege);
        collegeResult = collegeFuse.search(college).map((x: any) => x.item._id);
      }

      if (
        (priceMaxSearch ?? priceMax) !== 400 ||
        (priceMinSearch ?? priceMin) !== 0
      ) {
        priceResult = listingData.filter((listing) => {
          console.log("priceMax: ", priceMax);
          console.log("PriceMaxSearch: ", priceMaxSearch);
          console.log("PriceMin: ", priceMin);
          console.log("PriceMinSearch: ", priceMinSearch);
          console.log("Price: ", listing.price);
          console.log(listing.price <= priceMax);

          console.log(priceMaxSearch ? priceMaxSearch : priceMax);
          console.log(priceMinSearch ? priceMinSearch : priceMin);
          return (
            listing.price <= (priceMaxSearch ? priceMaxSearch : priceMax) &&
            listing.price >= (priceMinSearch ? priceMinSearch : priceMin)
          );
        });
      }
      console.log(collegeResult);
      console.log(priceResult);
      console.log(searchResult);
      console.log(
        getTripleArraysIntersection(searchResult, collegeResult, priceResult)
      );

      let filtered = getTripleArraysIntersection(
        searchResult,
        collegeResult,
        priceResult
      );

      console.log(filtered);
      setAdvancedFiltered(
        listingData.filter((listing: Listing) => {
          console.log(listing);
          console.log(filtered);
          return (
            filtered.includes(listing._id) ||
            (query === "" && priceMin == 0 && priceMax == 400 && college == "")
          );
        })
      );
    }
  };

  const findCollege = (e: any) => {
    setCollege(e.target.value);
    search();
  };

  const findMinPrice = (e: any) => {
    console.log(e.target);
    if (!e.target.value) {
      setPriceMin(0);
      search(0, undefined);
    } else {
      setPriceMin(parseFloat(e.target.value));
      search(parseFloat(e.target.value), undefined);
    }
  };

  const findMaxPrice = (e: any) => {
    if (!e.target.value) {
      setPriceMax(400);
      search(undefined, 400);
    } else {
      setPriceMax(parseFloat(e.target.value));
      search(undefined, parseFloat(e.target.value))
    }
  };

  const findQuery = (e: any) => {
    setQuery(e.target.value);
    search();
  };

  return (
    <>
      <Container maxW="container.lg">
        <Box w="100px"></Box>
        <Box>
          <HStack>
            <InputGroup onChange={search} style={{ borderColor: "#FFC176" }}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                type="search"
                w="1xl"
                focusBorderColor="#FFC176"
                placeholder="Search for item"
                onChange={findQuery}
              />
            </InputGroup>
            <Input
              type="number"
              w="1sm"
              onChange={findMinPrice}
              placeholder="Min Price"
            ></Input>
            <Input
              type="number"
              w="1sm"
              onChange={findMaxPrice}
              placeholder="Max Price"
            ></Input>
            <Input
              type="search"
              w="1xl"
              onChange={findCollege}
              placeholder="University"
            ></Input>
          </HStack>
        </Box>

        <Box d="flex">
          {console.log(advancedFiltered)}
          {!error ? (
            isLoaded && advancedFiltered.length > 0 ? (
              advancedFiltered.map((listing: Listing) => (
                <Box
                  key={listing._id}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  m="10px"
                  className={styles.card}
                >
                  <Image src={listing.image} alt="listing picture"></Image>
                  <Box p="3">
                    <Box fontWeight="bold" fontSize="2xl" as="h2">
                      {listing.name}
                    </Box>

                    <Box>${listing.price}</Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box>No items founds</Box>
            )
          ) : (
            <Box>Error, please try again</Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Gallery;
