import { NextApiRequest, NextApiResponse } from "next";
import db, { LISTING_DB } from "../../../util/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const listing = await db.getDocument({
      db: LISTING_DB,
      docId: req.query.id as string,
    });

    res.status(200).json(listing.result);
  } catch (err) {
    res.status(500).json({ err });
  }
}
