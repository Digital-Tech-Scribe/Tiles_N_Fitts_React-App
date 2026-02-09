#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts all images to WebP format with high quality (90%)
 * Also creates optimized JPEG/PNG fallbacks
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync, mkdirSync, renameSync } from 'fs';
import { join, extname, basename, dirname } from 'path';

const PUBLIC_DIR = './public';
const BACKUP_DIR = './public_backup';
const QUALITY = 90; // High quality - virtually indistinguishable from original
const MAX_WIDTH = 1920; // Max width for images

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function getAllImages(dir, images = []) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllImages(fullPath, images);
    } else {
      const ext = extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push(fullPath);
      }
    }
  }
  
  return images;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function optimizeImage(imagePath) {
  const ext = extname(imagePath).toLowerCase();
  const dir = dirname(imagePath);
  const name = basename(imagePath, ext);
  const webpPath = join(dir, `${name}.webp`);
  
  try {
    const originalSize = statSync(imagePath).size;
    
    // Convert to WebP using cwebp (if available) or sips (macOS)
    try {
      // Try cwebp first (best quality)
      execSync(`cwebp -q ${QUALITY} -resize ${MAX_WIDTH} 0 "${imagePath}" -o "${webpPath}" 2>/dev/null`, { stdio: 'pipe' });
    } catch {
      // Fallback to sips (macOS built-in) + ImageMagick if available
      try {
        execSync(`sips -Z ${MAX_WIDTH} -s format jpeg -s formatOptions ${QUALITY} "${imagePath}" --out "${imagePath}.tmp" 2>/dev/null && mv "${imagePath}.tmp" "${imagePath}"`, { stdio: 'pipe' });
        console.log(`  ⚠️  Resized with sips (no WebP): ${imagePath}`);
        return { original: originalSize, optimized: statSync(imagePath).size, skippedWebp: true };
      } catch {
        console.log(`  ⚠️  Skipped (no tools): ${imagePath}`);
        return null;
      }
    }
    
    const newSize = statSync(webpPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✅ ${basename(imagePath)}: ${formatSize(originalSize)} → ${formatSize(newSize)} (${savings}% smaller)`);
    
    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.log(`  ❌ Failed: ${imagePath} - ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  
  // Check if cwebp is installed
  try {
    execSync('which cwebp', { stdio: 'pipe' });
    console.log('✅ cwebp found - will convert to WebP format\n');
  } catch {
    console.log('⚠️  cwebp not found. Install with: brew install webp');
    console.log('   Will attempt fallback optimization...\n');
  }
  
  // Find all images
  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to optimize\n`);
  
  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  // Create backup
  if (!existsSync(BACKUP_DIR)) {
    console.log(`Creating backup at ${BACKUP_DIR}...`);
    execSync(`cp -r ${PUBLIC_DIR} ${BACKUP_DIR}`);
    console.log('Backup created.\n');
  } else {
    console.log(`Backup already exists at ${BACKUP_DIR}\n`);
  }
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;
  
  for (const image of images) {
    const result = await optimizeImage(image);
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
      successCount++;
    }
  }
  
  console.log('\n============================');
  console.log('📊 Summary');
  console.log(`   Images processed: ${successCount}/${images.length}`);
  console.log(`   Original size: ${formatSize(totalOriginal)}`);
  console.log(`   Optimized size: ${formatSize(totalOptimized)}`);
  console.log(`   Total savings: ${formatSize(totalOriginal - totalOptimized)} (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('\n⚠️  Remember to update your code to use .webp extensions!');
}

main().catch(console.error);
