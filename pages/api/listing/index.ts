import { DrawerCloseButton } from "@chakra-ui/modal";
import { NextApiRequest, NextApiResponse } from "next";
import db, { LISTING_DB } from "../../../util/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET": {
            try {
                const listings = await db.postFind({
                    db: LISTING_DB,
                    selector: {},
                });

                res.status(200).json(listings.result.docs);
            } catch (err) {
                res.status(500).json({ err });
            }
        }
        case "POST": {
            try {
                const { title, description, image, price, college, contact } =
                    req.body;

                if (
                    !title ||
                    !description ||
                    !image ||
                    !price ||
                    !college ||
                    !contact
                ) {
                    throw new Error("Missing required fields");
                }

                console.log(title, description, image, price, college, contact);

                const response = await db.postDocument({
                    db: LISTING_DB,
                    document: {
                        name: title,
                        description,
                        price,
                        image,
                        college,
                        contact,
                    },
                });

                console.log(response);

                res.status(200).json({ message: "success" });
            } catch (err) {
                res.status(500).json({ err });
            }
        }
    }
}
