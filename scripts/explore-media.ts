#!/usr/bin/env npx tsx
/**
 * DatoCMS Media Explorer Script
 * 
 * Run this script to discover available media assets in DatoCMS.
 * Useful for AI agents and developers to understand available imagery.
 * 
 * Usage:
 *   npm run media                          # Show all uploads overview
 *   npm run media:all                      # List all uploads with details
 *   npx tsx scripts/explore-media.ts --search "property"   # Search by filename
 *   npx tsx scripts/explore-media.ts --tag "hero"          # Filter by tag
 *   npx tsx scripts/explore-media.ts --images              # Show only images
 *   npx tsx scripts/explore-media.ts --json                # Output as JSON
 *   npx tsx scripts/explore-media.ts --markdown            # Output as markdown (for AI)
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { existsSync } from 'fs'

// Load environment variables (check multiple possible locations)
const envPaths = ['.env.local', '.env']
for (const envPath of envPaths) {
  const fullPath = resolve(process.cwd(), envPath)
  if (existsSync(fullPath)) {
    config({ path: fullPath })
    break
  }
}

import { 
  getMediaLibraryOverview,
  searchUploads,
  getAllUploads,
  getImageUploads,
  getUploadsByTag,
  formatMediaAsset,
  generateMediaContextForAgent
} from '../lib/media'

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
}

function log(message: string, color: keyof typeof COLORS = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`)
}

function logHeader(title: string) {
  console.log('')
  log('═'.repeat(60), 'cyan')
  log(`  ${title}`, 'bright')
  log('═'.repeat(60), 'cyan')
  console.log('')
}

function logSubHeader(title: string) {
  console.log('')
  log(`── ${title} ──`, 'yellow')
}

async function showOverview() {
  logHeader('DatoCMS Media Library Overview')
  
  try {
    const overview = await getMediaLibraryOverview()
    
    log(`Total Uploads: ${overview.totalUploads}`, 'green')
    log(`Total Images: ${overview.imageCount}`, 'green')
    
    logSubHeader('File Formats')
    for (const [format, count] of Object.entries(overview.byFormat)) {
      log(`  ${format}: ${count}`, 'reset')
    }
    
    if (overview.allTags.length > 0) {
      logSubHeader('Tags')
      log(`  ${overview.allTags.join(', ')}`, 'magenta')
    }
    
    if (overview.smartTags.length > 0) {
      logSubHeader('AI-Detected Tags')
      log(`  ${overview.smartTags.join(', ')}`, 'magenta')
    }
    
    logSubHeader('Assets Preview (first 10)')
    
    const previewAssets = overview.assets.slice(0, 10)
    for (const asset of previewAssets) {
      const dims = asset.dimensions 
        ? `${asset.dimensions.width}x${asset.dimensions.height}` 
        : 'N/A'
      console.log('')
      log(`  📷 ${asset.filename}`, 'bright')
      log(`     ${dims} | ${asset.sizeKB}KB | ${asset.format}`, 'dim')
      log(`     ${asset.url}`, 'blue')
      if (asset.alt) log(`     Alt: "${asset.alt}"`, 'dim')
      if (asset.tags.length) log(`     Tags: ${asset.tags.join(', ')}`, 'magenta')
      if (asset.smartTags.length) log(`     Smart Tags: ${asset.smartTags.join(', ')}`, 'magenta')
      if (asset.colors.length) log(`     Dominant Colors: ${asset.colors.join(', ')}`, 'dim')
    }
    
    if (overview.totalUploads > 10) {
      log(`\n  ... and ${overview.totalUploads - 10} more assets`, 'dim')
      log(`  Run with --all to see complete list`, 'dim')
    }
    
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'yellow')
    console.error(error)
  }
}

async function searchMedia(query: string) {
  logHeader(`Search Results for "${query}"`)
  
  try {
    const { uploads, total } = await searchUploads(query)
    
    log(`Found: ${total} matches`, 'green')
    
    if (uploads.length === 0) {
      log('  No assets found matching your search', 'dim')
      return
    }
    
    for (const upload of uploads) {
      const asset = formatMediaAsset(upload)
      console.log('')
      log(`  📷 ${asset.filename}`, 'bright')
      log(`     URL: ${asset.url}`, 'blue')
      if (asset.dimensions) {
        log(`     ${asset.dimensions.width}x${asset.dimensions.height} | ${asset.format}`, 'dim')
      }
      if (asset.alt) log(`     Alt: "${asset.alt}"`, 'dim')
      if (asset.tags.length) log(`     Tags: ${asset.tags.join(', ')}`, 'magenta')
    }
    
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'yellow')
    console.error(error)
  }
}

async function filterByTag(tag: string) {
  logHeader(`Assets Tagged "${tag}"`)
  
  try {
    const { uploads, total } = await getUploadsByTag(tag)
    
    log(`Found: ${total} matches`, 'green')
    
    if (uploads.length === 0) {
      log('  No assets found with this tag', 'dim')
      return
    }
    
    for (const upload of uploads) {
      const asset = formatMediaAsset(upload)
      console.log('')
      log(`  📷 ${asset.filename}`, 'bright')
      log(`     URL: ${asset.url}`, 'blue')
      if (asset.dimensions) {
        log(`     ${asset.dimensions.width}x${asset.dimensions.height} | ${asset.format}`, 'dim')
      }
      if (asset.alt) log(`     Alt: "${asset.alt}"`, 'dim')
    }
    
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'yellow')
    console.error(error)
  }
}

async function listAllImages() {
  logHeader('All Image Uploads')
  
  try {
    const { uploads, total } = await getImageUploads({ first: 200 })
    
    log(`Total Images: ${total}`, 'green')
    log(`Showing: ${uploads.length}`, 'dim')
    
    for (const upload of uploads) {
      const asset = formatMediaAsset(upload)
      const dims = asset.dimensions 
        ? `${asset.dimensions.width}x${asset.dimensions.height}` 
        : 'N/A'
      log(`  • ${asset.filename} (${dims}, ${asset.sizeKB}KB)`, 'reset')
      log(`    ${asset.url}`, 'dim')
    }
    
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'yellow')
    console.error(error)
  }
}

async function listAll() {
  logHeader('All DatoCMS Uploads')
  
  try {
    const { uploads, total } = await getAllUploads({ first: 200 })
    
    log(`Total Uploads: ${total}`, 'green')
    log(`Showing: ${uploads.length}`, 'dim')
    
    logSubHeader('Complete Asset List')
    
    for (const upload of uploads) {
      const asset = formatMediaAsset(upload)
      const dims = asset.dimensions 
        ? `${asset.dimensions.width}x${asset.dimensions.height}` 
        : 'N/A'
      console.log('')
      log(`  📷 ${asset.filename}`, 'bright')
      log(`     ID: ${asset.id}`, 'dim')
      log(`     URL: ${asset.url}`, 'blue')
      log(`     Optimized (for AI): ${asset.optimizedUrl}`, 'dim')
      log(`     Dimensions: ${dims} | Format: ${asset.format} | Size: ${asset.sizeKB}KB`, 'reset')
      if (asset.alt) log(`     Alt: "${asset.alt}"`, 'green')
      if (asset.title) log(`     Title: "${asset.title}"`, 'green')
      if (asset.tags.length) log(`     Tags: ${asset.tags.join(', ')}`, 'magenta')
      if (asset.smartTags.length) log(`     Smart Tags: ${asset.smartTags.join(', ')}`, 'magenta')
      if (asset.colors.length) log(`     Dominant Colors: ${asset.colors.join(', ')}`, 'dim')
    }
    
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'yellow')
    console.error(error)
  }
}

async function outputJson() {
  try {
    const overview = await getMediaLibraryOverview()
    console.log(JSON.stringify(overview, null, 2))
  } catch (error) {
    console.error(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }))
  }
}

async function outputMarkdown() {
  try {
    const markdown = await generateMediaContextForAgent()
    console.log(markdown)
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
DatoCMS Media Explorer

Usage:
  npx tsx scripts/explore-media.ts                 Show overview of all uploads
  npx tsx scripts/explore-media.ts --all           Show all uploads with full details
  npx tsx scripts/explore-media.ts --images        Show only image uploads
  npx tsx scripts/explore-media.ts --search <q>    Search uploads by filename
  npx tsx scripts/explore-media.ts --tag <tag>     Filter uploads by tag
  npx tsx scripts/explore-media.ts --json          Output as JSON (for programmatic use)
  npx tsx scripts/explore-media.ts --markdown      Output as markdown (for AI context)

Examples:
  npx tsx scripts/explore-media.ts --search property
  npx tsx scripts/explore-media.ts --tag hero
  npx tsx scripts/explore-media.ts --json > media-inventory.json
  npx tsx scripts/explore-media.ts --markdown > MEDIA_CONTEXT.md

Note: For folder-based filtering, add folder IDs to lib/media.ts FOLDER_IDS
      (obtain IDs from DatoCMS admin URL when viewing a folder)
    `)
    return
  }
  
  const searchIndex = args.indexOf('--search')
  const tagIndex = args.indexOf('--tag')
  
  if (args.includes('--json')) {
    await outputJson()
  } else if (args.includes('--markdown')) {
    await outputMarkdown()
  } else if (searchIndex !== -1 && args[searchIndex + 1]) {
    await searchMedia(args[searchIndex + 1])
  } else if (tagIndex !== -1 && args[tagIndex + 1]) {
    await filterByTag(args[tagIndex + 1])
  } else if (args.includes('--images')) {
    await listAllImages()
  } else if (args.includes('--all')) {
    await listAll()
  } else {
    await showOverview()
  }
}

main().catch(console.error)
