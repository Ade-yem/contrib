import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { getResults } from "./hookActions";
import { monnifyHook } from "./monnify";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
    path: "/webhook/paystack",
    method: "POST",
    handler: getResults
})
http.route({
    path: "/webhook/monnify",
    method: "POST",
    handler: monnifyHook
})

export default http;
