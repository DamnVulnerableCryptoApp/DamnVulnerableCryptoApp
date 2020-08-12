#!/usr/bin/env node

const { spawn } = require('child_process');
const child = spawn('npm', ['start']);

child.stdout.setEncoding('utf8');
child.stdout.on('data', (chunk) => console.log(chunk));

child.stderr.pipe(process.stdout);

// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });