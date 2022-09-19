/* eslint-disable no-console */
// @ts-check
const fs = require('fs');
const readline = require('readline');
const { PrismaClient, Prisma } = require('@prisma/client');
const colors = require('colors');

/** @type {import('@prisma/client').Prisma.SwitcherCreateInput[]} */
const switchers = [
  {
    name: 'hoge',
    ipaddress: '192.168.1.1',
  },
  {
    name: 'fuga',
    ipaddress: '192.168.1.2',
    enabled: false,
  },
  {
    name: 'piyo',
    ipaddress: '192.168.1.3',
  },
  {
    name: 'zoon',
    ipaddress: '192.168.1.4',
  },
  {
    name: 'hyou',
    ipaddress: '192.168.1.5',
    enabled: false,
  },
];

const prisma = new PrismaClient({ log: ['query'] });

/** @type { string | undefined } */
let provider = '';
const path = './prisma/migrations/migration_lock.toml';
if (fs.existsSync(path)) {
  const data = fs.readFileSync(path, 'utf8');
  provider = /provider\s+=\s+"(.+)"/.exec(data)?.[1];
}

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

const deleteAllData = async () => {
  const modelNames = Object.keys(prisma).filter(
    (x) => !(typeof x === 'string' && (x.startsWith('$') || x.startsWith('_')))
  );

  const queries = [];

  for (const modelName of modelNames) {
    const query = prisma[modelName].deleteMany();
    queries.push(query);

    // delete autoincrement sequence
    if (provider === 'sqlite') {
      const q = `DELETE FROM sqlite_sequence WHERE name = '${modelName}' COLLATE NOCASE`;
      const resetSequenceQuery = prisma.$executeRawUnsafe(q);
      queries.push(resetSequenceQuery);
    }
  }

  return await prisma.$transaction(queries);
};

/** @type {(question: string) => Promise<string>} */
const prompt = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};

const main = async () => {
  console.log('Start seeding.');

  try {
    const result = await transfer();
    console.log(colors.green(`Created ${result.length}columns.`));
  } catch (e) {
    console.error(colors.red(e.message));

    console.log(colors.yellow('Data already exits.'));
    const answer = await prompt(colors.yellow('Delete all data and try seeding again? (y/n) '));
    if (answer.trim().toLowerCase() === 'y') {
      const deleteAllDataResult = await deleteAllData();
      const deleteCount = deleteAllDataResult
        .flatMap((table) => (table.count ? table.count : 0))
        .reduce((sum, count) => (sum += count));

      const result = await transfer();

      console.log(colors.red(`Delete ${deleteCount} columns.`));
      console.log(colors.green(`Created ${result.length} columns.`));
    }
  }

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
