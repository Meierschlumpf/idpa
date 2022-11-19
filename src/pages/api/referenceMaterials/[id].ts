import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const material = await prisma?.referenceMaterial.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!material) return res.status(404).end('Not found 404');

  res.redirect(301, material.link);
}
