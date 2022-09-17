// @ts-check
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');
const colors = require('colors');

const prisma = new PrismaClient();

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

/** @type {import('@prisma/client').Prisma.LogCreateInput[]} */
const logs = [
  {
    message: 'this is first log',
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
  for (const log of logs) {
    const seed = prisma.log.create({
      data: { ...log },
    });
    seeds.push(seed);
  }

  return await prisma.$transaction(seeds);
};

// // TemplateStringArray => https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#using-variables
// // https://zenn.dev/cohky/articles/prisma-to-truncate
// const truncateAllTables = async () => {
//   const transactions = [];
//   // 外部キーを無効化 ※ここでエラーになるのでコメントアウト
//   transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

//   const allProperties = Object.keys(prisma);
//   const modelNames = allProperties.filter((x) => !(typeof x === 'string' && (x.startsWith('$') || x.startsWith('_'))));

//   for (const modelName of modelNames) {
//     transactions.push(prisma[modelName].deleteMany());
//   }

//   // 外部キーを有効化
//   transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);

//   await prisma.$transaction(transactions);
// };

const deleteAllData = async () => {
  const modelNames = Object.keys(prisma).filter(
    (x) => !(typeof x === 'string' && (x.startsWith('$') || x.startsWith('_')))
  );

  const queries = [];

  for (const modelName of modelNames) {
    const query = prisma[modelName].deleteMany();
    queries.push(query);
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
    console.error(colors.red('An error occurred.'));
    console.error(colors.red(e.message));

    const answer = await prompt(colors.yellow('Delete all data and try seeding again? (y/n) '));
    if (answer.trim().toLowerCase() === 'y') {
      const deleteAllDataResult = await deleteAllData();
      const deleteCount = deleteAllDataResult.flatMap((table) => table.count).reduce((sum, count) => (sum += count));
      console.log(colors.red(`Delete ${deleteCount} columns.`));

      const result = await transfer();
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
