# Soccer Lineup SVG

A NodeJS endpoint for generating a soccer lineup in svg image by passing through a url in a specific format.

## Rationale

I was pitching this vague idea to my awesome colleague, Rob, and he immediately was brainstorming along.

## How to test?

- `npm install`
- `npm start` // spins up a server with nodemon
- Open browser and surf to [http://localhost:9069/lineup?formation=433&players=31-2-5](http://localhost:9069/lineup?formation=433&players=31-2-5)

## Url

Currently, the testing url is [http://localhost:9069/lineup?formation=433&players=31-2-5-7-10-11-17-22-24-27-34](http://localhost:9069/lineup?formation=433&players=31-2-5-7-10-11-17-22-24-27-34). This will generate an svg with stacked players. Positioning is up next.
