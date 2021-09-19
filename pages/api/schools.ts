import { NextApiRequest, NextApiResponse } from "next";
import { schools } from "../../constants/schools";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(schools);
}
