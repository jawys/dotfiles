// Use https://finicky-kickstart.now.sh to generate basic configuration
// Learn more about configuration options: https://github.com/johnste/finicky/wiki/Configuration

module.exports = {
  defaultBrowser: "Safari",
  // defaultBrowser: "Firefox Developer Edition",
  rewrite: [
    // {
    //   match: "localhost",
    //   url: {
    //     protocol: "http",
    //   },
    // },
    {
      match: ".com", //() => true, // Execute rewrite on all incoming urls to make this example easier to understand
      url({ url }) {
        const removeKeysStartingWith = ["utm_", "uta_"]; // Remove all query parameters beginning with these strings
        const removeKeys = ["fblid", "gclid"]; // Remove all query parameters matching these keys

        const search = url.search
          .split("&")
          .map((parameter) => parameter.split("="))
          .filter(
            ([key]) =>
              !removeKeysStartingWith.some((startingWith) =>
                key.startsWith(startingWith)
              )
          )
          .filter(
            ([key]) => !removeKeys.some((removeKey) => key === removeKey)
          );

        return {
          ...url,
          search: search.map((parameter) => parameter.join("=")).join("&"),
        };
      },
    },
    /* {
      match: ({ url }) => url.protocol === "http",
      url: {
        protocol: "https"
      }
    }, */
    {
      match: finicky.matchDomains(["google.com"]),
      url: "https://duckduckgo.com",
    },
    {
      match: "amazon.com/*",
      url: {
        host: "smile.amazon.com",
      },
    },
  ],
  handlers: [
    {
      match: [
        /*
        "zoom.us/*", 
        finicky.matchDomains(/.*\.zoom.us/),
        */
        /zoom.us\/j\//,
      ],
      browser: "us.zoom.xos",
    },
    {
      match: "open.spotify.com/*",
      browser: "Spotify",
    },
    {
      match: "www.paypal.com/*",
      browser: "PayPal",
    },
    {
      // Open any url that includes some strings in Firefox
      match: /bbb|localhost/,
      browser: "Firefox Developer Edition",
    },
    /* {
      // Open google.com and *.google.com urls in Google Chrome
      match: [
        "google.com*", // match google.com urls
        finicky.matchDomains(/.*\.google.com/) // use helper function to match on domain only
      ],
      browser: "Google Chrome"
    }, */
  ],
};
