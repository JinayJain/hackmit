import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import Fuse from "fuse.js";

import theme from "../styles/suggest.module.css";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const router = useRouter();

    const [schools, setSchools] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const fuse = new Fuse(schools);

    useEffect(() => {
        async function getSchools() {
            // get a list of the schools
            const schools = await fetch("/api/schools").then((res) =>
                res.json()
            );

            setSchools(schools);
            console.log(schools);
        }

        getSchools();
    }, []);

    function renderSuggestion(suggestion: string) {
        return (
            <Box p={2}>
                <Text>{suggestion}</Text>
            </Box>
        );
    }

    return (
        <>
            <NavBar />
            <Box
                bg="linear-gradient(15deg, rgba(150,62,90,1) 12%, rgba(218,143,17,1) 91%);"
                h="100vh"
            >
                <section>
                    <Box pt="120px" textAlign="center">
                        <Heading
                            fontSize="4rem"
                            color="white"
                            textAlign="center"
                            mb="6"
                        >
                            HandOff
                        </Heading>
                        <Heading fontWeight="light" color="white">
                            Find new hands for your used college items
                        </Heading>
                        <Box maxW="1200px" margin="auto" mt={8}>
                            <Flex w="100%">
                                <Autosuggest
                                    theme={theme}
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={({
                                        value,
                                    }) => {
                                        if (value.length > 20) {
                                            setSuggestions(schools.slice(0, 5));
                                        } else {
                                            setSuggestions(
                                                fuse
                                                    .search(value, {
                                                        limit: 5,
                                                    })
                                                    .map((res) => res.item)
                                            );
                                        }
                                    }}
                                    onSuggestionsClearRequested={() =>
                                        setSuggestions([])
                                    }
                                    getSuggestionValue={(s) => s}
                                    renderSuggestion={renderSuggestion}
                                    multiSection={false}
                                    inputProps={{
                                        style: {
                                            padding: "12px 24px",
                                            borderRadius: "8px",
                                            width: "100%",
                                        },
                                        onChange: (e, { newValue }) =>
                                            setQuery(newValue),
                                        value: query,
                                        placeholder: "Search for a school",
                                    }}
                                />
                            </Flex>
                            <Button
                                mt="4"
                                colorScheme="orange"
                                onClick={() =>
                                    router.push(`/gallery?college=${query}`)
                                }
                            >
                                Begin your handoff
                            </Button>
                        </Box>
                    </Box>
                </section>
            </Box>
        </>
    );
};

export default Home;
