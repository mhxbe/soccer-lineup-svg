import fs from 'fs';
import path from 'path';

function readImage(asset, res) {
  const mapper = {
    cat: { link: '/cat.jpg', mime: 'image/jpeg' },
    svg: { link: '/soccer.svg', mime: 'image/svg+xml' },
  };
  const img = mapper[asset];

  const dir = path.join(__dirname, 'images');
  const file = path.join(dir, img.link);
  const stream = fs.createReadStream(file);

  stream.on('open', () => {
    res.set('Content-Type', img.mime);
    stream.pipe(res);
  });

  stream.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Image not found or generated yet.');
  });
}

const playersCollection = {
  '2': 'Dudouit  Emeric',
  '3': 'Prychynenko  Denis',
  '5': 'Dom  Joren',
  '7': 'Saint-Louis  Dylan',
  '8': 'Holzhauser  Rapha',
  '10': 'Maes  Alexander',
  '11': 'Placca  Fessou',
  '14': 'Seigers  Rubin',
  '15': 'Bourdin  Pierre',
  '17': 'Keersmaecker  Brian',
  '22': 'Bugridze  Irakli',
  '24': 'Vorogovskiy  Yan',
  '26': 'Brogno  Loris',
  '27': 'Halaimia  Reda',
  '31': 'Vanhamel  Mike',
  '34': 'Tissoudali  Tarik',
  '72': 'Lejoly  Antoine',
  '77': 'Vancamp  Jorn',
};

const formations = {
  433: [
    [[0, 368], [[225.75, 0]]],
    [[0, 250], [[40, 0], [150.5, 35], [292, 35], [411.5, 0]]],
    [[0, 167], [[85, 0], [225, 0], [366.5, 0]]],
    [[0, 84], [[85, 0], [225, 0], [366.5, 0]]],
  ],
};

export function generatePlayer(coordinates, playerIds) {
  const playerId = playerIds.shift();
  const [lastName] = playersCollection[playerId].split('  ');
  return `<g transform="translate(${coordinates.join(', ')})">
    <path d="m3.5 0, 20 0, -3.5 17.5, -20 0z" fill="#e2e2e2" />
    <path d="m23.5 0, 105 0, -3.5 17.5, -105 0z" fill="#5c3281" />
    <text x="11" y="13" text-anchor="middle" font-size="13" class="number text">${playerId}</text>
    <text x="74" y="13" text-anchor="middle" font-size="13" class="player text">${lastName}</text>
  </g>`;
}

export function buildPlayers(players, playerIds) {
  return players
    .map(coordinates => generatePlayer(coordinates, playerIds))
    .join('');
}
export function buildLineup(formation, playerIds) {
  return formation
    .map(
      ([xyGroup, players]) =>
        `<g transform="translate(${xyGroup.join(', ')})">
          ${buildPlayers(players, playerIds)}
        </g>`
    )
    .join('');
}

export const generateLineup = (req, res) => {
  const { formation, players } = req.query;
  const playerIds = players.split('-');

  const formationToBuild = formations[formation];
  if (!formationToBuild) {
    const message =
      'Requested formation does not exist. Please try again with another valid formation.';
    console.warn(message);
    return res.status(400).send(message);
  }

  var svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="580" height="400">
    <style>.number { fill: #5c3281; } .player { fill: #e2e2e2; } .text { font-weight: bold; font-style: italic; font-family: monospace; }</style>
    <title>Lineup</title>
    <rect x="0" y="0" height="400" width="580" fill="#3f3154" />
    <path d="m25 400, 100 -350, 330 0, 100 350z" fill="#342548" />
    ${buildLineup(formationToBuild, playerIds)}
  </svg>`;

  res.setHeader('content-type', 'image/svg+xml');
  console.log('Generated lineup.');
  return res.status(200).send(svgString);
};
