import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const sourceRoots = ['app', 'components', 'utils'];
const sourceExtension = /\.(?:[cm]?[jt]sx?)$/;
// تلتقط المسار كاملاً داخل علامات الاقتباس، بما في ذلك الأسماء القديمة التي تحتوي مسافات أو أقواساً.
const pathPattern = /["'`]((?:\/media|\/assets|\/img)\/[^"'`]+)["'`]/g;

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const references = [];
for (const sourceRoot of sourceRoots) {
  for (const file of walk(join(root, sourceRoot)).filter((path) => sourceExtension.test(path))) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(pathPattern)) {
      const assetPath = match[1].split(/[?#]/)[0];
      if (assetPath.includes('${')) continue;
      references.push({ file: relative(root, file), assetPath });
    }
  }
}

const legacyReferences = references.filter(({ assetPath }) => assetPath.startsWith('/assets/') || assetPath.startsWith('/img/'));
const missingReferences = references.filter(({ assetPath }) => !existsSync(join(root, 'public', assetPath.slice(1))));

if (legacyReferences.length || missingReferences.length) {
  if (legacyReferences.length) {
    console.error('مسارات قديمة يجب نقلها إلى /media:');
    for (const reference of legacyReferences) console.error(`- ${reference.file}: ${reference.assetPath}`);
  }
  if (missingReferences.length) {
    console.error('صور ثابتة غير موجودة:');
    for (const reference of missingReferences) console.error(`- ${reference.file}: ${reference.assetPath}`);
  }
  process.exit(1);
}

console.log(`تم التحقق من ${references.length} مرجع صورة ثابت؛ لا توجد مسارات مكسورة أو مجلدات قديمة مستخدمة.`);
