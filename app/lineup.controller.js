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

const players = {
  '2': 'Dudouit  Emeric',
  '4': 'Seigers  Rubin',
  '5': 'Dom  Joren',
  '7': 'Saint Louis  Dylan',
  '8': 'Holzhauer Rapha',
  '10': 'Maes  Alexander',
  '11': 'Placca  Fessou',
  '15': 'Bourdin  Pierre',
  '17': 'Keersmaecker  Brian',
  '22': 'Bugridze  Irakli',
  '24': 'Vorogokskiy  Yan',
  '26': 'Brogno  Loris',
  '27': 'Reda  Halaimia',
  '31': 'Vanhamel  Mike',
  '34': 'Tissoudali  Tarik',
  '72': 'Lejoly  Antoine',
  '77': 'Van Camp  Jorn',
};

export function generatePlayer(playerId, index) {
  const [lastName] = players[playerId].split('  ');
  return `<g transform="translate(10, ${(index + 1) * 25})">
    <path d="m3.5 0, 20 0, -3.5 17.5, -20 0z" fill="#e2e2e2" />
    <path d="m23.5 0, 105 0, -3.5 17.5, -105 0z" fill="#5c3281" />
    <text x="11" y="13" text-anchor="middle" font-size="13" class="number text">${playerId}</text>
    <text x="74" y="13" text-anchor="middle" font-size="13" class="player text">${lastName}</text>
  </g>`;
}

export const generateLineup = (req, res) => {
  const { formation: formationString, players: playersString } = req.query;
  const formation = formationString.split('');
  const players = playersString.split('-');

  var generatedPlayers = players.map(generatePlayer);

  var svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="580" height="400">
    <style>.number { fill: #5c3281; } .player { fill: #e2e2e2; } .text { font-weight: bold; font-style: italic; font-family: monospace; }</style>
    <title>Lineup</title>
    <rect x="0" y="0" height="400" width="580" fill="#3f3154" />
    <path d="m25 400, 100 -350, 330 0, 100 350z" fill="#342548" />
    ${generatedPlayers.join('')}
  </svg>`;

  res.setHeader('content-type', 'image/svg+xml');
  console.log('Generated lineup.');
  return res.status(200).send(svgString);

  // return res.status(200).json({ formation, players });
};
