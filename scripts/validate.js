const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../index.html');
const html = fs.readFileSync(p, 'utf8');

const startTag = '<script id="archify-source-evidence-data" type="application/json">';
const endTag = '</script>';

const startIdx = html.indexOf(startTag);
if (startIdx === -1) {
  console.error('ERROR: archify-source-evidence-data not found!');
  process.exit(1);
}

const endIdx = html.indexOf(endTag, startIdx);
const jsonStr = html.slice(startIdx + startTag.length, endIdx);

try {
  const data = JSON.parse(jsonStr);
  console.log('VALID! Repository:', data.repository.url, '@', data.repository.revision);
  console.log('Nodes count:', Object.keys(data.nodes).length);
  console.log('References count:', data.referenceCount);
} catch (err) {
  console.error('ERROR parsing evidence JSON:', err.message);
  process.exit(1);
}

const candidatePath = path.join(__dirname, '../abase-architecture.candidate.json');
try {
  const candidate = JSON.parse(fs.readFileSync(candidatePath, 'utf8'));
  console.log('VALID! Candidate JSON has', candidate.components.length, 'components and', candidate.connections.length, 'connections.');
} catch (err) {
  console.error('ERROR parsing candidate JSON:', err.message);
  process.exit(1);
}
