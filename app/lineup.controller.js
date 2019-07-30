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

export const generateLineup = (req, res) => {
  const { formation: formationString, players: playersString } = req.query;
  const formation = formationString.split('');
  const players = playersString.split('-');

  if (formationString === 'cat' || formationString === 'svg') {
    readImage(formationString, res);
  } else {
    return res.status(200).json({ formation, players });
  }
};
