import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const outputRoot = resolve(dirname(currentFile), '..', 'dist');
const port = Number.parseInt(process.env.PORT ?? '4179', 10);

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  const requestedPath = decodeURIComponent(requestUrl.pathname);
  const targetPath = resolve(outputRoot, `.${requestedPath === '/' ? '/index.html' : requestedPath}`);

  if (!isInside(outputRoot, targetPath)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const targetStat = await stat(targetPath);
    const filePath = targetStat.isDirectory() ? join(targetPath, 'index.html') : targetPath;
    const body = await readFile(filePath);

    response.writeHead(200, {
      'content-type': contentType(filePath),
    });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Commonloom Node example running at http://localhost:${port}`);
});

function isInside(root, target) {
  const pathFromRoot = relative(root, target);

  return pathFromRoot === '' || (!pathFromRoot.startsWith('..') && !isAbsolute(pathFromRoot));
}

function contentType(filePath) {
  switch (extname(filePath)) {
    case '.css':
      return 'text/css; charset=utf-8';
    case '.html':
      return 'text/html; charset=utf-8';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

