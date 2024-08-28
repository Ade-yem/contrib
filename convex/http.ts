import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { getResults } from "./hookActions";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
    path: "/webhook/paystack",
    method: "POST",
    handler: getResults
})

export default http;
