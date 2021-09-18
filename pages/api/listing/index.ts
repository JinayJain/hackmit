import { DrawerCloseButton } from "@chakra-ui/modal";
import { NextApiRequest, NextApiResponse } from "next";
import db, { LISTING_DB } from "../../../util/db";

interface Listing {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const listings = await db.postFind({
    db: LISTING_DB,
    selector: {},
  });

  res.status(200).json(listings.result.docs);
}
