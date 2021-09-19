import { IamAuthenticator } from "ibm-watson/auth";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";

console.log(process.env.WATSON_API_KEY);

const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY!,
    }),
    version: "2018-04-05",
    serviceUrl:
        "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com",
});

export default nlu;
