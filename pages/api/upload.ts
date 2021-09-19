import { NextApiRequest, NextApiResponse } from "next";
import storage from "../../util/storage";
import { v4 as uuid } from "uuid";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { filename } = req.query;
    const fileKey = `${uuid()}_${filename}`;

    // Generate pre-signed upload URL for COS
    const url = await storage.getSignedUrlPromise("putObject", {
        Bucket: "hackmit-listing",
        Key: fileKey,
    });

    res.status(200).json({
        url,
        img: `https://hackmit-listing.${process.env.COS_ENDPOINT}/${fileKey}`,
    });
}
