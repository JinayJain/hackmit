import { DrawerCloseButton } from "@chakra-ui/modal";
import { NextApiRequest, NextApiResponse } from "next";
import db, { LISTING_DB } from "../../../util/db";
import nlu from "../../../util/watson";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            {
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
            break;
        case "POST":
            {
                try {
                    const {
                        title,
                        description,
                        image,
                        price,
                        college,
                        contact,
                    } = req.body;

                    console.log(
                        title,
                        description,
                        image,
                        price,
                        college,
                        contact
                    );

                    // generate a list of tags from the description using the IBM Watson NLU API

                    const tags = await nlu
                        .analyze({
                            text: description,
                            features: {
                                keywords: {
                                    limit: 3,
                                },
                            },
                        })
                        .then((response) => response.result.keywords)
                        .then((kws) => kws?.map((kw) => kw.text));

                    console.log(tags);

                    const response = await db.postDocument({
                        db: LISTING_DB,
                        document: {
                            name: title,
                            description,
                            price,
                            image,
                            college,
                            contact,
                            tags,
                        },
                    });

                    console.log(response);

                    res.status(200).json({ message: "success" });
                } catch (err) {
                    res.status(500).json({ err });
                }
            }
            break;
    }
}
