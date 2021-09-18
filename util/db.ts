import { CloudantV1 } from "@ibm-cloud/cloudant";

const db = CloudantV1.newInstance({});

export const LISTING_DB = "listing";
export const USER_DB = "user";

export default db;
