# Desk

A private assistant and workspace built with React, TypeScript, Express, and locally hosted AI models. Planned features include chat, searchable memory, tasks, notes, and projects.

Development starts on a Mac. The application can later be adapted for deployment on an organization's own servers.

## Current progress

Confirmed:

- Ollama is running locally and responds to HTTP requests.
- The version endpoint returned `0.40.10` during setup.
- `llama3.2:3b` downloaded successfully.
- `nomic-embed-text` downloaded successfully.
- The existing React/TypeScript repository has been cloned for this project.

The Express configuration below is the agreed setup. Its health endpoint has not yet been confirmed. Database storage, memory retrieval, and the connection between the UI and Ollama are still to be implemented.

## Project structure

```text
desk/
  client/       # Existing React/TypeScript application
  server/       # Express/TypeScript API
  shared/       # Common types for client and server
  .gitignore
  package.json  # Root scripts/workspaces can be added later
  README.md
```

Use a single Git repository, with `.git` at the root. Keep the existing client build tooling. Ollama and its downloaded model files live outside this repository.

The shared folder is intended for API contracts and other common types. Shared imports and build configuration have not been wired up yet. Keep secrets and server implementation out of this folder.

## How the components fit together

The intended request path is:

**React client → Express API → Ollama → model**

Express will also access the database for conversations and memory retrieval. The browser should call Express rather than access the model server directly.

| Component | Responsibility |
|---|---|
| React + TypeScript | Chat interface and workspace UI |
| Axios | HTTP requests from the application |
| Express + TypeScript | API, context assembly, database access, and calls to Ollama |
| Ollama | Local HTTP server that loads and runs models |
| Llama model | Generates chat responses |
| Embedding model | Converts text into vectors for similarity search |
| Database, to be selected | Stores conversations, memories, and embedding vectors |

WebSockets are not required for basic text chat. Streaming responses can use HTTP. Axios streaming configuration will be implemented when the chat endpoint is added.

## Local AI setup

### 1. Install and start Ollama

On macOS, install the application from <https://ollama.com/download/mac>, or use Homebrew:

```bash
brew install --cask ollama
open -a Ollama
```

The application manages a background model server. Its local API is available at:

```text
http://127.0.0.1:11434
```

Verify that it is running:

```bash
curl http://127.0.0.1:11434/api/version
```

The setup check returned:

```json
{"version":"0.40.10"}
```

On Debian, Ollama would normally run as a systemd service rather than being managed by a macOS application. Nginx is not needed for the initial local setup; it can later provide HTTPS and proxy access to the application.

### 2. Download the models

Both models are ready:

- **`llama3.2:3b`** — generates chat responses.
- **`nomic-embed-text`** — generates vectors for memory search.

To reproduce the downloads:

```bash
ollama pull llama3.2:3b
ollama pull nomic-embed-text
```

Inspect installed models:

```bash
ollama list
```

A model is a set of trained numerical weights and associated metadata. Ollama supplies the software that performs inference. Pulling a model stores it on disk; requests load it into memory as needed.

### 3. Test a chat request

```bash
curl http://127.0.0.1:11434/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "llama3.2:3b",
    "messages": [
      {"role": "user", "content": "Explain what a web server does."}
    ],
    "stream": false
  }'
```

This is a manual test, not an application endpoint implemented in this repository yet.

## Express and TypeScript setup

Use `tsx` during development and the TypeScript compiler (`tsc`) for production builds. Babel is not required for this server.

### Install dependencies

From the project root:

```bash
mkdir -p server/src
cd server
npm init -y
npm install express dotenv
npm install -D typescript tsx @types/node @types/express
```

Configure the package:

```bash
npm pkg set type=module
npm pkg set 'scripts.dev=tsx watch src/index.ts'
npm pkg set 'scripts.build=tsc'
npm pkg set 'scripts.start=node dist/index.js'
npm pkg set 'scripts.typecheck=tsc --noEmit'
```

### TypeScript configuration

Create `server/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true
  },
  "include": ["src"]
}
```

This configuration covers the server's source files. Importing TypeScript source from `shared/` will require additional build configuration or a shared workspace package.

### Server entry point

Create `server/src/index.ts`:

```ts
import 'dotenv/config'
import express from 'express'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
```

With this ESM configuration, relative imports in TypeScript use the emitted `.js` extension, for example:

```ts
import router from './routes/chat.js'
```

### Development

From `server/`:

```bash
npm run dev
```

In another terminal:

```bash
curl http://127.0.0.1:3001/api/health
```

Expected response:

```json
{"ok":true}
```

The API uses port `3001`; Ollama uses port `11434`. The existing client configuration determines the UI's development port.

`tsx` reloads the development server but does not perform type checking. Check types separately:

```bash
npm run typecheck
```

### Production build

From `server/`:

```bash
npm run build
npm start
```

`tsc` checks types and emits JavaScript into `server/dist/`. Node runs that compiled JavaScript. Process supervision and production deployment configuration will be added later.

### Git exclusions

Add these patterns to the root `.gitignore`, preserving existing entries:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
```

Keep database data, downloaded models, and credentials out of Git. Commit dependency lockfiles.

## Planned persistent memory

Memory will be implemented by the application, not by retraining the chat model.

When storing a memory:

1. Send its text to `nomic-embed-text` through Ollama.
2. Store the original text and returned vector together in the database.
3. Associate the record with its user, source, and timestamps.

When answering a question:

1. Generate an embedding for the question, optionally including recent conversation context.
2. Query the database for nearby stored vectors, filtered by user and access permissions.
3. Retrieve the corresponding text.
4. Send the question, selected memories, and recent conversation to `llama3.2:3b`.
5. Save the conversation messages.

The same embedding model must be used for stored text and search queries. Changing embedding models generally requires generating new embeddings for stored records.

Vector similarity finds candidates; it does not guarantee relevance or truth. Memory correction, deletion, and retrieval quality will need testing.

Fine-tuning is separate: it updates model parameters using reviewed training examples and requires additional training software. It is not part of the initial application.

## Privacy and deployment

The initial setup is intended to run locally, with Express and Ollama restricted to loopback access. The application should use locally served assets and avoid unnecessary external requests.

Downloaded local models can perform inference without an internet connection. This does not by itself establish that every surrounding application is configured to avoid network activity. Outbound network controls and verification belong in the deployment work.

Before deployment for other users, add authentication, authorization, secure session handling, retention controls, backups, and appropriate network restrictions. Keep the Ollama API behind the application rather than exposing it publicly.

## Next steps

1. Complete and verify the Express health endpoint.
2. Add an Express chat endpoint that calls Ollama using Axios.
3. Connect the existing React client to Express.
4. Add HTTP response streaming.
5. Select and configure the database for conversations and vectors.
6. Implement and test memory retrieval.
7. Configure shared types and root development scripts.
8. Add authentication and deployment controls before client use.
