// @ts-check
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const baseDir = process.cwd();
const schemaPath = path.join(baseDir, 'prisma', 'schema.prisma');
const tempPath = path.join(baseDir, 'prisma', '_schema.prisma');

async function main() {
  fs.copyFileSync(schemaPath, tempPath);
  const data = fs.readFileSync(tempPath, 'utf8');
  fs.writeFileSync(
    schemaPath,
    data.replace(/(generator client[\s]*{[\s]*provider[\s]*=[\s]*")([\S]+)(")/, '$1prisma-json-schema-generator$3'),
    'utf8'
  );

  try {
    const result = execSync('npx prisma generate');
    console.log(result.toString());
  } catch (err) {
    throw err;
  } finally {
    fs.copyFileSync(tempPath, schemaPath);
    fs.unlinkSync(tempPath);
  }
}

main();
