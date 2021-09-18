import React from "react";
import {useState} from "react";
import type { NextPage } from "next";
import { Container, InputLeftElement, Input, InputGroup, Box, Image } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import Fuse from 'fuse.js'




const Gallery: NextPage = () => {
    const mock_data = [
        {
            "id": "12312321",
            "title": "test Textbook",
            "price": "10",
            "image": "https://media.istockphoto.com/photos/books-of-knowledge-picture-id590073366?k=20&m=590073366&s=612x612&w=0&h=1tLmtQ-sjK35xlvMRNANiQGsi3oL4Y8T49qKPuHCEqo="
        },
        {
            "id": "1231231",
            "title": "Used Textbook",
            "price": "10",
            "image": "https://media.istockphoto.com/photos/books-of-knowledge-picture-id590073366?k=20&m=590073366&s=612x612&w=0&h=1tLmtQ-sjK35xlvMRNANiQGsi3oL4Y8T49qKPuHCEqo="
        },
        {
            "id": "1232321",
            "title": "Used Textbook",
            "price": "10",
            "image": "https://media.istockphoto.com/photos/books-of-knowledge-picture-id590073366?k=20&m=590073366&s=612x612&w=0&h=1tLmtQ-sjK35xlvMRNANiQGsi3oL4Y8T49qKPuHCEqo="
        }
        
    ];

    const [filtered, setFiltered] = useState<string[]>([]);
    const search = (e: any) => {
        const options = {
            includeScore: true,
            keys: ['title', 'description']
         }

         const fuse = new Fuse(mock_data, options)
         const result = fuse.search(e.target.value).map(x => x.item.id);
         console.log(result);
         setFiltered(result);
    }

    const advanced_filtered = mock_data.filter(listing => filtered.includes(listing.id));

  return (
    <>
        <Container maxW="container.lg">
            <Box>
                <InputGroup onChange={search}>
                    <InputLeftElement
                    pointerEvents="none"
                    >
                    <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input type="search" placeholder="Search for item" />
                </InputGroup>
            </Box>


            <Box d="flex">
                {(mock_data && filtered && advanced_filtered.length > 0) ? advanced_filtered.map((listing) => (
                    <Box key={listing.id}  maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px">
                        <Image src={listing.image} alt="listing picture"></Image>
                        <Box p="3">
        
                            <Box
                                fontWeight="bold"
                                fontSize="2xl"
                                as="h2"
                            >
                                {listing.title}
                            </Box>

                            <Box>
                                ${listing.price}
                            </Box>
                        </Box>
                    </Box>
                )) : <Box>No items founds</Box>}
            </Box>
        </Container>
    </>
  );




};

export default Gallery;