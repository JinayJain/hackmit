import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    InputRightElement,
} from "@chakra-ui/react";

const Home: NextPage = () => {
    return (
        <Box bg="orange.500">
            <section style={{ position: "relative", minHeight: "70vh" }}>
                <Box pt="60px">
                    <Heading fontSize="4rem" color="white" textAlign="center">
                        Hand to Hand
                    </Heading>
                    <Box maxW="1200px" margin="auto" mt={8}>
                        <InputGroup>
                            <Input
                                fontSize="xl"
                                placeholder="Find your college"
                                type="search"
                                bg="white"
                            />
                            <InputRightAddon as={Button}>
                                Search
                            </InputRightAddon>
                        </InputGroup>
                    </Box>
                </Box>

                <div className="wave">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                            className="shape-fill"
                        ></path>
                    </svg>
                </div>
            </section>
        </Box>
    );
};

export default Home;
