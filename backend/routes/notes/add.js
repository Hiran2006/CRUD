export default async (req, res) => {
  const { note } = req.body;
  console.log(note);
  res.end();
};
