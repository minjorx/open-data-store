#!/usr/bin/env node
/**
 * generate-index.js
 * 扫描目录并生成 index.json 索引文件
 * 用法: node generate-index.js [rootDir]
 */

import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = process.argv[2] || join(__dirname, '..');

/**
 * 递归扫描目录，生成索引
 */
async function scanDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    if (entry.name === 'index.json') continue;

    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      items.push({ name: entry.name, type: 'dir' });
      // 递归处理子目录
      await generateIndex(fullPath);
    } else if (entry.isFile()) {
      const stats = await stat(fullPath);
      items.push({
        name: entry.name,
        type: 'file',
        size: stats.size
      });
    }
  }

  return items;
}

/**
 * 为指定目录生成 index.json
 */
async function generateIndex(dir) {
  const items = await scanDir(dir);
  const indexPath = join(dir, 'index.json');

  // 写入 index.json
  const content = JSON.stringify(items, null, 2) + '\n';
  const { writeFile } = await import('fs/promises');
  await writeFile(indexPath, content, 'utf-8');

  console.log(`Generated: ${relative(rootDir, indexPath)} (${items.length} entries)`);
  return items;
}

// 主入口
generateIndex(rootDir)
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
