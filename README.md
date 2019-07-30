# Soccer Lineup SVG

A NodeJS endpoint for generating a soccer lineup in svg image by passing through a url in a specific format.

## Rationale

I was pitching this vague idea to my awesome colleague, Rob, and he immediately was brainstorming along.

## How to test?

- `npm install`
- `npm start` // spins up a server with nodemon
- Open browser and surf to [http://localhost:9069/lineup?formation=abc&players=x-y-z](http://localhost:9069/lineup?formation=abc&players=x-y-z)

## Url

Currently, the testing url is [http://localhost:9069/lineup?formation=433&players=1-2-3-4-5-6-7-8-9-10-11](http://localhost:9069/lineup?formation=433&players=1-2-3-4-5-6-7-8-9-10-11). This will output the formation & players in JSON. The form of the url will probably change to make it more accessible/shareable.

## Displaying image/sv

We can display an image or svg by following links:

- cat.jpg: [http://localhost:9069/lineup?formation=cat&players=9000](http://localhost:9069/lineup?formation=cat&players=9000)

- soccer.svg [http://localhost:9069/lineup?formation=svg&players=9000](http://localhost:9069/lineup?formation=svg&players=9000)

This means the possibilities are endless for our soccer lineup svg generator.
