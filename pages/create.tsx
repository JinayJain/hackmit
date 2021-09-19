import React, { useRef } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { Textarea } from "@chakra-ui/textarea";

import storage from "../util/storage";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/dist/client/router";

function Create() {
    const router = useRouter();
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const uploadRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register("image", { required: true });

    const [imageName, setImageName] = React.useState<string | undefined>("");

    async function onSubmit(data: Record<string, any>) {
        try {
            toast({
                title: "Creating listing...",
                status: "info",
            });

            const { title, description, price, image, college, contact } = data;
            console.log(title, description, price, image);

            const { url, img } = await fetch(
                `/api/upload?filename=${image[0].name}`
            ).then((res) => res.json());

            // send the file to S3
            const imgUrl = await fetch(url, {
                method: "PUT",
                body: image[0],
            }).then((res) => res.text());

            console.log("test");

            const res = await fetch("/api/listing", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    image: img,
                    college,
                    contact,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(res);

            toast({
                title: "Listing created!",
                status: "success",
            });

            router.push("/");
        } catch (err) {
            console.log(err);

            toast({
                title: "Error creating listing",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    function onError(error: any) {
        toast({
            title: "Error creating listing",
            status: "error",
        });
    }

    return (
        <Box maxW="1000px" margin="auto">
            <Heading mt={8} mb={4}>
                Create Listing
            </Heading>
            <Stack spacing={4}>
                <FormControl isRequired={true} isInvalid={errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input
                        placeholder="Title"
                        {...register("title", { required: true })}
                    />
                </FormControl>
                <FormControl isRequired={true}>
                    <FormLabel>Price</FormLabel>
                    <NumberInput precision={2}>
                        <NumberInputField
                            placeholder="$"
                            {...register("price", { required: true })}
                        />
                    </NumberInput>
                </FormControl>
                <FormControl isRequired={true}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        placeholder="Describe your listing"
                        {...register("description", { required: true })}
                    ></Textarea>
                </FormControl>
                <FormControl isRequired={true}>
                    <FormLabel>Image</FormLabel>
                    <InputGroup>
                        <InputLeftAddon
                            as={Button}
                            onClick={() => uploadRef.current?.click()}
                        >
                            Upload File
                        </InputLeftAddon>
                        <input
                            type="file"
                            accept="image/*"
                            ref={(e) => {
                                ref(e);
                                uploadRef.current = e;
                            }}
                            {...rest}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                setImageName(e.target.files?.[0].name);
                            }}
                        />
                        <Input readOnly={true} value={imageName} />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired={true}>
                    <FormLabel>College</FormLabel>
                    <Input
                        placeholder="College"
                        {...register("college", { required: true })}
                    />
                </FormControl>
                <FormControl isRequired={true}>
                    <FormLabel>Contact Info</FormLabel>
                    <Textarea
                        placeholder="Contact info"
                        {...register("contact", { required: true })}
                    ></Textarea>
                </FormControl>

                <Box>
                    <Button
                        colorScheme="orange"
                        onClick={handleSubmit(onSubmit, onError)}
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const items = await storage.listBuckets().promise();
    console.log(items.Buckets);

    return {
        props: {},
    };
};

export default Create;
