import { planBadges, semesters, subjects } from './_mock';

export const removeEverything = async () => {
  await prisma!.planItemBadge.deleteMany();
  await prisma!.planBadge.deleteMany();
  await prisma!.referenceMaterial.deleteMany();
  await prisma!.task.deleteMany();
  await prisma!.homework.deleteMany();
  await prisma!.planItem.deleteMany();
  await prisma!.plan.deleteMany();
  await prisma!.semster.deleteMany();
  await prisma!.subject.deleteMany();
  await prisma!.activeRole.deleteMany();
};

export const addDefaultValues = async (defaultRole: 'student' | 'teacher') => {
  await prisma!.activeRole.create({
    data: {
      name: defaultRole,
    },
  });
  for (let i = 0; i < subjects.length; i++) {
    await prisma!.subject.create({
      data: subjects.at(i)!,
    });
  }
  for (let i = 0; i < semesters.length; i++) {
    await prisma!.semster.create({
      data: semesters.at(i)!,
    });
  }
  for (let i = 0; i < planBadges.length; i++) {
    await prisma!.planBadge.create({
      data: planBadges.at(i)!,
    });
  }
};

export const generateLastSemesterEntries = async () => {
  const badges = await prisma!.planBadge.findMany()!;
  const subjects = await prisma!.subject.findMany()!;

  const referenceMaterials = {
    deutsch: {
      oneNote: '6ca743df-1bca-4197-8702-d884bbcf3129',
    },
    physik: {
      oneNote: '67705d1f-7802-470c-a74c-a3fdb29a47e3',
      aufgabenSammlung: '7afe6bcc-87da-4654-b5f2-6bb167bab259',
      formelSammlung: 'e90a1226-76b1-4bcf-8b87-fcb0a1c5cbc3',
    },
    mathematik: {
      unterlagen: 'af28eaf7-daa1-41f2-82ec-6d4d2665e731',
    },
    wr: {
      kaufvertrag: 'bf1ea892-1ab2-4f42-bb7a-6bd890f45413',
    },
  };

  const deutsch = subjects.find((x) => x.routeName === 'deutsch');
  await prisma!.plan.create({
    data: {
      subjectId: deutsch!.id,
      startTime: 8 * 60 + 15,
      endTime: 9 * 60 + 45,
      day: 2,
      semesterId: '2022-02',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.deutsch.oneNote,
            name: 'OneNote',
            link: 'https://gibbch-my.sharepoint.com/:o:/r/personal/burrin_gibb_ch/Documents/Kursnotizb%C3%BCcher/BMS1_I2019B_Deutsch?d=w31a213ffd42c4bce938925013f7350fd&csf=1&web=1&e=IkH6hX',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2022-08-16'),
            title: 'Willkommen zurück',
          },
          {
            date: new Date('2022-08-23'),
            title: 'Textproduktion - Essay',
          },
          {
            date: new Date('2022-08-30'),
            title: 'Textproduktion - Essay',
          },
          {
            date: new Date('2022-09-06'),
            title: 'Textproduktion - Essay',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'submission')!.id,
              },
            },
          },
          {
            date: new Date('2022-09-13'),
            title: 'Klassiker des 20. Jh.',
          },
          {
            date: new Date('2022-09-20'),
            title: 'Klassiker des 20. Jh.',
          },
          {
            date: new Date('2022-10-18'),
            title: 'Klassiker des 20. Jh.',
          },
          {
            date: new Date('2022-10-25'),
            title: 'Klassiker des 20. Jh.',
          },
          {
            date: new Date('2022-11-01'),
            title: 'Klassiker des 20. Jh.',
            badges: {
              create: {
                badgeId: badges.find((x) => x.name === 'sol')!.id,
                evaluated: false,
              },
            },
          },
          {
            date: new Date('2022-11-08'),
            title: 'Klassiker des 20. Jh.',
            badges: {
              create: {
                badgeId: badges.find((x) => x.name === 'presentation')!.id,
                evaluated: true,
              },
            },
          },
          {
            date: new Date('2022-11-15'),
            title: 'Klassiker des 20. Jh.',
            badges: {
              create: {
                badgeId: badges.find((x) => x.name === 'presentation')!.id,
                evaluated: true,
              },
            },
          },
          {
            date: new Date('2022-11-22'),
            title: 'Journalismus',
          },
          {
            date: new Date('2022-11-29'),
            title: 'Journalismus',
          },
          {
            date: new Date('2022-12-06'),
            title: 'Journalismus',
          },
          {
            date: new Date('2022-12-13'),
            title: 'Journalismus',
          },
          {
            date: new Date('2022-12-20'),
            title: 'Journalismus',
            badges: {
              create: {
                badgeId: badges.find((x) => x.name === 'exam')!.id,
                evaluated: true,
              },
            },
          },
          {
            date: new Date('2023-01-10'),
            title: 'Literaturepochen des 19. Jh',
          },
          {
            date: new Date('2023-01-17'),
            title: 'Literaturepochen des 19. Jh',
          },
          {
            date: new Date('2023-01-24'),
            title: 'Literaturepochen des 19. Jh',
          },
        ],
      },
    },
  });

  const physik = subjects.find((x) => x.routeName === 'physik');
  await prisma!.plan.create({
    data: {
      subjectId: physik!.id,
      startTime: 10 * 60 + 5,
      endTime: 11 * 60 + 35,
      day: 2,
      semesterId: '2022-02',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.physik.oneNote,
            name: 'OneNote',
            link: 'https://gibbch-my.sharepoint.com/:o:/r/personal/hellinge_gibb_ch/Documents/I78B?d=w2be5417c50b64ba7a52ecdb45f4836bc&csf=1&web=1&e=5G9DYx',
          },
          {
            id: referenceMaterials.physik.aufgabenSammlung,
            name: 'Aufgabensammlung 2',
            link: 'https://drive.google.com/file/d/1X-6-Hn16iDwYERWIaHmNg7IE8mh_E1ur/view',
          },
          {
            id: referenceMaterials.physik.formelSammlung,
            name: 'Formelsammlung',
            link: 'https://drive.google.com/file/d/1VMJzy5EL6Z5O9WBR8YKvUQbhve5RI0t9/view',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2022-08-16'),
            title: 'Statik',
          },
          {
            date: new Date('2022-08-23'),
            title: 'Statik',
          },
          {
            date: new Date('2022-08-30'),
            title: 'Statik',
          },
          {
            date: new Date('2022-09-06'),
            title: 'Statik',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-09-13'),
            title: 'Drehmoment',
          },
          {
            date: new Date('2022-09-20'),
            title: 'Drehmoment',
          },
          {
            date: new Date('2022-10-18'),
            title: 'Drehmoment',
          },
          {
            date: new Date('2022-10-25'),
            title: 'Drehmoment',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-11-01'),
            title: 'Dynamik',
          },
          {
            date: new Date('2022-11-08'),
            title: 'Dynamik',
          },
          {
            date: new Date('2022-11-15'),
            title: 'Dynamik',
          },
          {
            date: new Date('2022-11-22'),
            title: 'Dynamik',
          },
          {
            date: new Date('2022-11-29'),
            title: 'Dynamik',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-12-06'),
            title: 'Dynamik',
          },
          {
            date: new Date('2022-12-13'),
            title: 'Dynamik',
          },
          {
            date: new Date('2022-12-20'),
            title: 'Dynamik',
            badges: {
              create: {
                badgeId: badges.find((x) => x.name === 'exam')!.id,
                evaluated: true,
              },
            },
          },
          {
            date: new Date('2023-01-10'),
            title: 'Energieformen',
          },
          {
            date: new Date('2023-01-17'),
            title: 'Energieformen',
          },
          {
            date: new Date('2023-01-24'),
            title: 'Energieformen',
          },
        ],
      },
    },
  });

  const mathematik = subjects.find((x) => x.routeName === 'mathematik');
  await prisma!.plan.create({
    data: {
      subjectId: mathematik!.id,
      startTime: 12 * 60 + 40,
      endTime: 15 * 60 + 5,
      day: 2,
      semesterId: '2022-02',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.mathematik.unterlagen,
            name: 'Unterlagen',
            link: 'https://gibbch-my.sharepoint.com/personal/rentsch_gibb_ch/_layouts/15/onedrive.aspx?e=5%3Acfa1a84653c040aabeef11a824e8e1a4&at=9&id=%2Fpersonal%2Frentsch%5Fgibb%5Fch%2FDocuments%2F%5FKlassen%2FBM1TALS%2DI2019b%2FUnterlagen&FolderCTID=0x012000937DC35937C7B445B06CDE80354C3C75',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2022-08-16'),
            title: 'Exp.- und Log.-funktionen',
          },
          {
            date: new Date('2022-08-23'),
            title: 'Exp.- und Log.-funktionen',
          },
          {
            date: new Date('2022-08-30'),
            title: 'Potenz- und Wurzelfunktionen',
          },
          {
            date: new Date('2022-09-06'),
            title: 'Potenz- und Wurzelfunktionen',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-09-13'),
            title: 'Polynomfunktionen',
          },
          {
            date: new Date('2022-09-20'),
            title: 'Polynomfunktionen',
          },
          {
            date: new Date('2022-10-18'),
            title: 'Vektoren II',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-10-25'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-11-01'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-11-08'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-11-15'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-11-22'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-11-29'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-12-06'),
            title: 'Vektoren II',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-12-13'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2022-12-20'),
            title: 'Vektoren II',
          },
          {
            date: new Date('2023-01-10'),
            title: 'Stereometrie',
            badges: {
              create: {
                badgeId: badges.find((x) => x.name === 'exam')!.id,
                evaluated: true,
              },
            },
          },
          {
            date: new Date('2023-01-17'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-01-24'),
            title: 'Stereometrie',
          },
        ],
      },
    },
  });

  const wr = subjects.find((x) => x.routeName === 'wirtschaft-recht');
  await prisma!.plan.create({
    data: {
      subjectId: wr!.id,
      startTime: 15 * 60 + 20,
      endTime: 16 * 60 + 50,
      day: 2,
      semesterId: '2022-02',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.wr.kaufvertrag,
            name: 'Kaufvertrag',
            link: 'https://gibbch-my.sharepoint.com/:w:/g/personal/kuenzle_gibb_ch/ESUfOcpzzi5EoaisjCwUxuUB6Yeh1R8AzyTCHD9osKGM9w?e=B8YTb1',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2022-08-16'),
            title: 'IDPA',
          },
          {
            date: new Date('2022-08-23'),
            title: 'Arbeitsrecht',
          },
          {
            date: new Date('2022-08-30'),
            title: 'Arbeitsrecht',
          },
          {
            date: new Date('2022-09-06'),
            title: 'IDPA',
          },
          {
            date: new Date('2022-09-13'),
            title: 'Arbeitsrecht',
          },
          {
            date: new Date('2022-09-20'),
            title: 'Arbeitsrecht',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-10-18'),
            title: 'Kaufvertrag',
          },
          {
            date: new Date('2022-10-25'),
            title: 'IDPA',
          },
          {
            date: new Date('2022-11-01'),
            title: 'Kaufvertrag',
          },
          {
            date: new Date('2022-11-08'),
            title: 'IDPA',
          },
          {
            date: new Date('2022-11-15'),
            title: 'Kaufvertrag',
          },
          {
            date: new Date('2022-11-22'),
            title: 'IDPA',
          },
          {
            date: new Date('2022-11-29'),
            title: 'IDPA',
          },
          {
            date: new Date('2022-12-06'),
            title: 'Kaufvertrag',
          },
          {
            date: new Date('2022-12-13'),
            title: 'Kaufvertrag',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2022-12-20'),
            title: 'IDPA',
          },
          {
            date: new Date('2023-01-10'),
            title: 'IDPA',
          },
          {
            date: new Date('2023-01-17'),
            title: 'IDPA',
          },
          {
            date: new Date('2023-01-24'),
            title: 'IDPA',
          },
        ],
      },
    },
  });
};

export const generateNextSemesterEntries = async () => {
  const badges = await prisma!.planBadge.findMany()!;
  const subjects = await prisma!.subject.findMany()!;

  const referenceMaterials = {
    deutsch: {
      oneNote: '6ca743df-1bca-4197-8702-d884bbcf312a',
    },
    physik: {
      oneNote: '67705d1f-7802-470c-a74c-a3fdb29a47ea',
      aufgabenSammlung: '7afe6bcc-87da-4654-b5f2-6bb167bab25a',
      formelSammlung: 'e90a1226-76b1-4bcf-8b87-fcb0a1c5cbca',
    },
    mathematik: {
      unterlagen: 'af28eaf7-daa1-41f2-82ec-6d4d2665e73a',
    },
    wr: {},
  };

  const deutsch = subjects.find((x) => x.routeName === 'deutsch');
  await prisma!.plan.create({
    data: {
      subjectId: deutsch!.id,
      startTime: 8 * 60 + 15,
      endTime: 9 * 60 + 45,
      day: 2,
      semesterId: '2023-01',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.deutsch.oneNote,
            name: 'OneNote',
            link: 'https://gibbch-my.sharepoint.com/:o:/r/personal/burrin_gibb_ch/Documents/Kursnotizb%C3%BCcher/BMS1_I2019B_Deutsch?d=w31a213ffd42c4bce938925013f7350fd&csf=1&web=1&e=IkH6hX',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2023-01-31'),
            title: 'Literaturepochen des 19. Jh',
          },
          {
            date: new Date('2023-02-07'),
            title: 'Literaturepochen des 19. Jh',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-02-14'),
            title: 'Theaterbesuch',
            badges: {
              create: {
                evaluated: false,
                badgeId: badges.find((x) => x.name === 'excursion')!.id,
              },
            },
          },
          {
            date: new Date('2023-02-21'),
            title: 'Kommunikationstheorie',
          },
          {
            date: new Date('2023-02-28'),
            title: 'Kommunikationstheorie',
          },
          {
            date: new Date('2023-03-07'),
            title: 'Kommunikationstheorie',
          },
          {
            date: new Date('2023-03-14'),
            title: 'Kommunikationstheorie',
          },
          {
            date: new Date('2023-03-21'),
            title: 'Kommunikationstheorie',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-03-28'),
            title: 'Projektwoche',
          },
          {
            date: new Date('2023-04-25'),
            title: 'Visualisierung',
          },
          {
            date: new Date('2023-05-02'),
            title: 'Visualisierung',
          },
          {
            date: new Date('2023-05-09'),
            title: 'Visualisierung',
          },
          {
            date: new Date('2023-05-16'),
            title: 'Visualisierung',
          },
          {
            date: new Date('2023-05-23'),
            title: 'Schriftliche BMP',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-05-30'),
            title: 'Individuelle Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-06-06'),
            title: 'Individuelle Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-06-13'),
            title: 'Individuelle Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-06-20'),
            title: 'Individuelle Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-06-27'),
            title: 'Abschluss',
          },
          {
            date: new Date('2023-07-04'),
            title: 'Mündliche BMP',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
        ],
      },
    },
  });

  const physik = subjects.find((x) => x.routeName === 'physik');
  await prisma!.plan.create({
    data: {
      subjectId: physik!.id,
      startTime: 10 * 60 + 5,
      endTime: 11 * 60 + 35,
      day: 2,
      semesterId: '2023-01',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.physik.oneNote,
            name: 'OneNote',
            link: 'https://gibbch-my.sharepoint.com/:o:/r/personal/hellinge_gibb_ch/Documents/I78B?d=w2be5417c50b64ba7a52ecdb45f4836bc&csf=1&web=1&e=5G9DYx',
          },
          {
            id: referenceMaterials.physik.aufgabenSammlung,
            name: 'Aufgabensammlung 2',
            link: 'https://drive.google.com/file/d/1X-6-Hn16iDwYERWIaHmNg7IE8mh_E1ur/view',
          },
          {
            id: referenceMaterials.physik.formelSammlung,
            name: 'Formelsammlung',
            link: 'https://drive.google.com/file/d/1VMJzy5EL6Z5O9WBR8YKvUQbhve5RI0t9/view',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2023-01-31'),
            title: 'Energieformen',
          },
          {
            date: new Date('2023-02-07'),
            title: 'Energieformen',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-02-14'),
            title: 'Leistung',
          },
          {
            date: new Date('2023-02-21'),
            title: 'Leistung',
          },
          {
            date: new Date('2023-02-28'),
            title: 'Leistung',
          },
          {
            date: new Date('2023-03-07'),
            title: 'Leistung',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-03-14'),
            title: 'Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-03-21'),
            title: 'Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-03-28'),
            title: 'Projektwoche',
          },
          {
            date: new Date('2023-04-25'),
            title: 'Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-05-02'),
            title: 'Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-05-09'),
            title: 'Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-05-16'),
            title: 'Prüfungsvorbereitung',
          },
          {
            date: new Date('2023-05-23'),
            title: 'Schriftliche BMP',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-05-30'),
            title: 'Freies Thema',
          },
          {
            date: new Date('2023-06-06'),
            title: 'Freies Thema',
          },
          {
            date: new Date('2023-06-13'),
            title: 'Freies Thema',
          },
          {
            date: new Date('2023-06-20'),
            title: 'Freies Thema',
          },
          {
            date: new Date('2023-06-27'),
            title: 'Freies Thema',
          },
        ],
      },
    },
  });

  const mathematik = subjects.find((x) => x.routeName === 'mathematik');
  await prisma!.plan.create({
    data: {
      subjectId: mathematik!.id,
      startTime: 12 * 60 + 40,
      endTime: 15 * 60 + 5,
      day: 2,
      semesterId: '2023-01',
      referenceMaterials: {
        create: [
          {
            id: referenceMaterials.mathematik.unterlagen,
            name: 'Unterlagen',
            link: 'https://gibbch-my.sharepoint.com/personal/rentsch_gibb_ch/_layouts/15/onedrive.aspx?e=5%3Acfa1a84653c040aabeef11a824e8e1a4&at=9&id=%2Fpersonal%2Frentsch%5Fgibb%5Fch%2FDocuments%2F%5FKlassen%2FBM1TALS%2DI2019b%2FUnterlagen&FolderCTID=0x012000937DC35937C7B445B06CDE80354C3C75',
          },
        ],
      },
      items: {
        create: [
          {
            date: new Date('2023-01-31'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-02-07'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-02-14'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-02-21'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-02-28'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-03-07'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-03-14'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-03-21'),
            title: 'Stereometrie',
          },
          {
            date: new Date('2023-03-28'),
            title: 'Projektwoche',
          },
          {
            date: new Date('2023-04-25'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-05-02'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-05-09'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-05-16'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-05-23'),
            title: 'Schriftliche BMP',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-05-30'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-06-06'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-06-13'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-06-20'),
            title: 'Repetieren',
          },
          {
            date: new Date('2023-06-27'),
            title: 'Repetieren',
          },
        ],
      },
    },
  });

  const wr = subjects.find((x) => x.routeName === 'wirtschaft-recht');
  await prisma!.plan.create({
    data: {
      subjectId: wr!.id,
      startTime: 15 * 60 + 20,
      endTime: 16 * 60 + 50,
      day: 2,
      semesterId: '2023-01',
      items: {
        create: [
          {
            date: new Date('2023-01-31'),
            title: 'IDPA',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'submission')!.id,
              },
            },
          },
          {
            date: new Date('2023-02-07'),
            title: 'IDPA',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'submission')!.id,
              },
            },
          },
          {
            date: new Date('2023-02-14'),
            title: 'IDPA Präsentation',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'presentation')!.id,
              },
            },
          },
          {
            date: new Date('2023-02-21'),
            title: 'Präsentations und Themenwoche',
          },
          {
            date: new Date('2023-02-28'),
            title: 'Mietrecht',
          },
          {
            date: new Date('2023-03-07'),
            title: 'Mietrecht',
          },
          {
            date: new Date('2023-03-14'),
            title: 'Mietrecht',
          },
          {
            date: new Date('2023-03-21'),
            title: 'Mietrecht',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-03-28'),
            title: 'Projektwoche',
          },
          {
            date: new Date('2023-04-25'),
            title: 'Familienrecht',
          },
          {
            date: new Date('2023-05-02'),
            title: 'Familienrecht',
          },
          {
            date: new Date('2023-05-09'),
            title: 'Infografik',
          },
          {
            date: new Date('2023-05-16'),
            title: 'Infografik',
          },
          {
            date: new Date('2023-05-23'),
            title: 'Schriftliche BMP',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'exam')!.id,
              },
            },
          },
          {
            date: new Date('2023-05-30'),
            title: 'Präsentationen',
            badges: {
              create: {
                evaluated: true,
                badgeId: badges.find((x) => x.name === 'presentation')!.id,
              },
            },
          },
          {
            date: new Date('2023-06-06'),
            title: 'Erbrecht',
          },
          {
            date: new Date('2023-06-13'),
            title: 'Erbrecht',
          },
          {
            date: new Date('2023-06-20'),
            title: 'Gerichtsbesuch',
            badges: {
              create: {
                evaluated: false,
                badgeId: badges.find((x) => x.name === 'excursion')!.id,
              },
            },
          },
          {
            date: new Date('2023-06-27'),
            title: 'Globalisierung',
          },
        ],
      },
    },
  });
};
