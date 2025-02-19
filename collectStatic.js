#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

async function generateFileList(dir) {
  try {
    // Read all entries in the directory
    const entries = await fs.readdir(dir);
    const files = [];

    // Loop through entries and include only files
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stats = await fs.stat(fullPath);
      if (stats.isFile()) {
        files.push(entry);
      }
    }

    // Prepare JSON output with pretty-printing
    const jsonOutput = JSON.stringify(files, null, 2);

    // Write the JSON array to output.json in the provided directory
    const outputPath = path.join(dir, 'output.json');
    await fs.writeFile(outputPath, jsonOutput);

    console.log(`File list written to ${outputPath}`);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Get directory from command-line arguments
const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node listFiles.js <directory_path>');
  process.exit(1);
}

// Run the script
generateFileList(dir);
