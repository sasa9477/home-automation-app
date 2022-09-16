// @ts-check

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/** @type {import('@prisma/client').Switcher[]} */
const switchers = [
  {
    id: 1,
    name: 'hoge',
    ipaddress: '192.168.1.1',
    enabled: true,
    turnOn: false,
  },
  {
    id: 2,
    name: 'fuga',
    ipaddress: '192.168.1.2',
    enabled: false,
    turnOn: false,
  },
  {
    id: 3,
    name: 'piyo',
    ipaddress: '192.168.1.3',
    enabled: true,
    turnOn: false,
  },
  {
    id: 4,
    name: 'zoon',
    ipaddress: '192.168.1.4',
    enabled: true,
    turnOn: false,
  },
  {
    id: 5,
    name: 'hyou',
    ipaddress: '192.168.1.5',
    enabled: true,
    turnOn: false,
  },
];

const transfer = async () => {
  const seeds = [];
  for (const switcher of switchers) {
    const seed = prisma.switcher.create({
      data: { ...switcher },
    });
    seeds.push(seed);
  }
  return await prisma.$transaction(seeds);
};

const main = async () => {
  console.log('Start seeding.');

  const result = await transfer();
  console.log(`Registerd ${result.length}columns.`);

  console.log('Seeding finished.');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
