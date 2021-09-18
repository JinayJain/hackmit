import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Box } from "@chakra-ui/react";

import db from "../util/db";

const Home: NextPage = () => {
  return <Box>hacc mit</Box>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dbs = await db.getAllDbs();
  console.log(dbs.result);

  return {
    props: {},
  };
};

export default Home;
