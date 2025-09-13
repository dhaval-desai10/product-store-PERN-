import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";


// init arcjet
export const aj = arcjet(
    {
        key: process.env.ARCJET_KEY,
        characteristics: ["ip.src"],
        rules: [
            // shield protect your app from comman attacks 
            shield({ mode: "LIVE" }),
            detectBot({
                mode: "LIVE",
                // block all bots except search engine 
                allow: [
                    "CATEGORY:SEARCH_ENGINE"
                    // see that full list at https://docs.arcjet.com/reference/detectbot#categories

                ]
            }),
            // rate limit requests to 100 requests per minute per IP
            tokenBucket({
                mode: "LIVE",
                refillRate: 5,
                interval: 10,
                capacity: 10,
                
            })
        ]
    }
)