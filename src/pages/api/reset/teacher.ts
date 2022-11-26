import { NextApiRequest, NextApiResponse } from 'next';
import { addDefaultValues, generateLastSemesterEntries, generateNextSemesterEntries, removeEverything } from './_helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await removeEverything();
  await addDefaultValues('teacher');
  await generateLastSemesterEntries();

  res.status(200).json({ code: 'ok', message: 'Successfully reset' });
}
