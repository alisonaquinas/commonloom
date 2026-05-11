import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import matter from 'gray-matter';

const repoRoot = process.cwd();
const plansRoot = join(repoRoot, 'docs', 'plans');
const terminalStatuses = new Set(['done', 'cancelled', 'deferred']);
const requiredTicketFields = [
  'id',
  'title',
  'type',
  'status',
  'phase',
  'created',
  'updated',
  'tags',
];
const failures = [];

for (const phaseDirName of await listPhaseDirectories()) {
  await verifyPhaseDirectory(phaseDirName);
}

if (failures.length > 0) {
  console.error('Plan process verification failed:');

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log('Plan process verification passed.');

async function listPhaseDirectories() {
  const entries = await readdir(plansRoot, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('phase-'))
    .map((entry) => entry.name)
    .sort();
}

async function verifyPhaseDirectory(phaseDirName) {
  const expectedPhase = Number.parseInt(/^phase-(\d+)-/.exec(phaseDirName)?.[1] ?? '', 10);
  const phaseDir = join(plansRoot, phaseDirName);
  const indexPath = join(phaseDir, 'index.md');
  const indexContent = await readFile(indexPath, 'utf8');
  const ticketFiles = (await readdir(phaseDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name !== 'index.md' && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort();
  const seenTicketIds = new Set();
  const ticketStatuses = [];

  for (const ticketFile of ticketFiles) {
    const ticketPath = join(phaseDir, ticketFile);
    const ticket = matter(await readFile(ticketPath, 'utf8'));
    const ticketId = String(ticket.data.id ?? '');
    const ticketStatus = String(ticket.data.status ?? '');

    for (const field of requiredTicketFields) {
      if (ticket.data[field] === undefined) {
        failures.push(`${phaseDirName}/${ticketFile} is missing frontmatter field ${field}.`);
      }
    }

    if (ticketId !== basename(ticketFile, '.md')) {
      failures.push(`${phaseDirName}/${ticketFile} id does not match filename.`);
    }

    if (ticket.data.phase !== expectedPhase) {
      failures.push(`${phaseDirName}/${ticketFile} phase must be numeric ${String(expectedPhase)}.`);
    }

    if (seenTicketIds.has(ticketId)) {
      failures.push(`${phaseDirName} has duplicate ticket id ${ticketId}.`);
    }

    seenTicketIds.add(ticketId);
    ticketStatuses.push([ticketId, ticketStatus]);

    if (!indexContent.includes(`/${ticketId}|${ticketId}`)) {
      failures.push(`${phaseDirName}/index.md does not list ${ticketId}.`);
    }

    const indexStatus = indexStatusForTicket(indexContent, ticketId);

    if (indexStatus && indexStatus !== ticketStatus) {
      failures.push(
        `${phaseDirName}/index.md lists ${ticketId} as ${indexStatus} but frontmatter is ${ticketStatus}.`,
      );
    }

    if (terminalStatuses.has(ticketStatus) && !ticket.content.includes(`Status set to ${ticketStatus}`)) {
      failures.push(`${phaseDirName}/${ticketFile} is ${ticketStatus} without matching workflow log text.`);
    }
  }

  const phaseSummaryPath = join(plansRoot, `${phaseDirName}.md`);
  const phaseSummary = matter(await readFile(phaseSummaryPath, 'utf8'));

  if (phaseSummary.data.status === 'done') {
    for (const [ticketId, ticketStatus] of ticketStatuses) {
      if (!terminalStatuses.has(ticketStatus)) {
        failures.push(`${phaseDirName} is done while ${ticketId} is ${ticketStatus}.`);
      }
    }
  }
}

function indexStatusForTicket(indexContent, ticketId) {
  const pattern = new RegExp(
    '\\| \\[\\[[^\\]]+/' +
      `${escapeRegExp(ticketId)}\\|${escapeRegExp(ticketId)}` +
      '\\]\\] \\| [^|]+ \\| [^|]+ \\| `([^`]+)` \\|',
  );
  const match = pattern.exec(indexContent);

  return match?.[1];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
