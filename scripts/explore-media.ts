#!/usr/bin/env npx tsx
/**
 * DatoCMS Media Explorer
 * 
 * Usage:
 *   npm run media              # List all images
 *   npm run media -- --search "house"  # Search by name
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { existsSync } from 'fs'

const envPaths = ['.env.local', '.env']
for (const p of envPaths) {
  const full = resolve(process.cwd(), p)
  if (existsSync(full)) { config({ path: full }); break }
}

import { getImageUploads, searchUploads, formatAsset, getMediaContext } from '../lib/media'

async function main() {
  const args = process.argv.slice(2)
  const searchIdx = args.indexOf('--search')
  
  if (args.includes('--markdown') || args.includes('-m')) {
    console.log(await getMediaContext())
    return
  }
  
  const uploads = searchIdx !== -1 && args[searchIdx + 1]
    ? await searchUploads(args[searchIdx + 1])
    : await getImageUploads()
  
  console.log(`\n📷 ${uploads.length} images\n`)
  
  for (const u of uploads) {
    const a = formatAsset(u)
    console.log(`  ${a.name} (${a.size})`)
    console.log(`  \x1b[34m${a.url}\x1b[0m\n`)
  }
}

main().catch(console.error)
