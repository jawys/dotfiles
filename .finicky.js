// Use https://finicky-kickstart.now.sh to generate basic configuration
// Learn more about configuration options: https://github.com/johnste/finicky/wiki/Configuration

const Firefox = 'Firefox Developer Edition';
module.exports = {
	options: {
		logRequests: true,
	},
	// defaultBrowser: 'Safari',
	defaultBrowser: Firefox,
	rewrite: [
		// {
		//   match: "localhost",
		//   url: {
		//     protocol: "http",
		//   },
		// },
		{
			match: () => true, // Execute rewrite on all incoming urls to make this example easier to understand
			url({ url }) {
				const removeKeysStartingWith = ['utm_', 'uta_']; // Remove all query parameters beginning with these strings
				const removeKeys = ['fblid', 'gclid']; // Remove all query parameters matching these keys
				const search = url.search
					.split('&')
					.map((parameter) => parameter.split('='))
					.filter(
						([key]) =>
							!removeKeysStartingWith.some((startingWith) =>
								key.startsWith(startingWith),
							),
					)
					.filter(
						([key]) => !removeKeys.some((removeKey) => key === removeKey),
					);
				return {
					...url,
					search: search.map((parameter) => parameter.join('=')).join('&'),
				};
			},
		},
		{
			match: finicky.matchDomains(['google.com']),
			url: { host: 'duckduckgo.com' },
		},
	],
	handlers: [
		{
			match: [
				// 'zoom.us/*',
				// finicky.matchDomains(/.*\.zoom.us/),
				/zoom.us\/j\//,
			],
			browser: 'us.zoom.xos',
		},
		{
			match: 'open.spotify.com/*',
			browser: 'Spotify',
		},
		{
			match: 'sendgrid.com',
			browser: 'Safari',
		},
		{
			match: /gitlab|(localhost|\d+(\.\d+){3})/,
			browser: Firefox,
		},
		// {
		// 	// Open any link clicked in XZY App
		// 	match: ({ opener }) =>
		// 		['code', 'teams'].includes(opener.name.toLowerCase()),
		// 	browser: Firefox,
		// },
	],
};
