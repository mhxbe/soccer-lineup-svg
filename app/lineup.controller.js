export const generateLineup = (req, res) => {
  const { formation: formationString, players: playersString } = req.query;
  const formation = formationString.split('');
  const players = playersString.split('-');

  return res.status(200).json({ formation, players });
};
