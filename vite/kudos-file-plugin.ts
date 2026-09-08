import { readFile, rename, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Connect, Plugin } from 'vite'
import { parseKudos } from '../src/features/kudos/parse-kudos.ts'

function configureKudosFile(server: { config: { root: string }; middlewares: Connect.Server }) {
  const filePath = resolve(server.config.root, 'data/kudos.json')
  let pendingWrite = Promise.resolve()

  server.middlewares.use(async (request, response, next) => {
    if (request.url?.split('?')[0] !== '/kudos.json') return next()

    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Cache-Control', 'no-store')

    try {
      if (request.method === 'GET') {
        await pendingWrite
        response.end(await readFile(filePath, 'utf8'))
        return
      }
      if (request.method !== 'PUT') {
        response.statusCode = 405
        response.setHeader('Allow', 'GET, PUT')
        response.end(JSON.stringify({ error: 'Method not allowed.' }))
        return
      }
      if (request.headers.origin && new URL(request.headers.origin).host !== request.headers.host) {
        response.statusCode = 403
        response.end(JSON.stringify({ error: 'File writes must come from this app.' }))
        return
      }

      let body = ''
      request.setEncoding('utf8')
      for await (const chunk of request) body += chunk
      let contents: string
      try {
        contents = `${JSON.stringify(parseKudos(body), null, 2)}\n`
      } catch {
        response.statusCode = 400
        response.end(JSON.stringify({ error: 'Invalid kudos data.' }))
        return
      }

      // Replace the file only after a complete write, and serialize overlapping saves.
      const save = pendingWrite.then(async () => {
        await writeFile(`${filePath}.tmp`, contents, 'utf8')
        await rename(`${filePath}.tmp`, filePath)
      })
      pendingWrite = save.catch(() => undefined)
      await save
      response.end(JSON.stringify({ saved: true }))
    } catch (error) {
      console.error('Could not read or save data/kudos.json:', error)
      response.statusCode = 500
      response.end(JSON.stringify({ error: 'Could not read or save kudos.json.' }))
    }
  })
}

export function kudosFilePlugin(): Plugin {
  return {
    name: 'kudos-file',
    configureServer: configureKudosFile,
    configurePreviewServer: configureKudosFile,
  }
}
