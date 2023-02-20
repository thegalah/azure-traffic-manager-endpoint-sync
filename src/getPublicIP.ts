import * as http from "http";
export const getPublicIP = (): Promise<string> => {
    return new Promise<string>((resolve) => {
        // Set the URL of the request to the ipify API
        const options: http.RequestOptions = {
            host: "api.ipify.org",
            port: 80,
            path: "/?format=json",
        };

        // Create a new http.ClientRequest object
        const req = http.request(options, (res) => {
            // Set the response encoding to utf8
            res.setEncoding("utf8");

            // When a chunk of data is received, append it to the body
            let body = "";
            res.on("data", (chunk) => {
                body += chunk;
            });

            // When the response completes, parse the JSON and log the IP address
            res.on("end", () => {
                const data = JSON.parse(body);
                resolve(data.ip);
            });
        });

        // Send the request
        req.end();
    });
};
