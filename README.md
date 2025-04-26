# JPG-to-PDF Converter

A full-stack, production-ready JPG-to-PDF conversion platform with secure cloud integration, robust backend, and a modern Next.js frontend. Built for scalability, speed, and ease of deployment.

---

## 🛠 Core Setup

- **Monorepo:** Managed via `package.json` workspaces for unified dependency management.
- **Containers:** Uses Docker for PostgreSQL and Redis orchestration.
- **Shared Tooling:** Consistent TypeScript, ESLint, and Prettier configuration across all packages.

---

## 🌐 Frontend (Next.js)

### Structure

- **`client/public/`**
  - `downloads/`: Stores user-generated PDFs (permissions: 755).
  - `assets/images/`: Default assets like logo and favicon.
  - `assets/styles/`: Global CSS.

- **`client/src/components/`**
  - `FilePreview.tsx`: Image thumbnail previews with delete functionality.
  - `UploadZone.tsx`: Drag-and-drop uploader with progress indicator.
  - `CloudAuthButtons.tsx`: OAuth buttons for Google and Microsoft.

- **`client/src/pages/api/`**
  - `convert/jpg-to-pdf.ts`: API route for JPG-to-PDF conversion.
  - `google-drive/auth.ts`: Google OAuth token management.
  - `google-drive/files.ts`: Google Drive file operations.
  - `onedrive/auth.ts`: Microsoft OAuth (MSAL) integration.
  - `onedrive/files.ts`: Microsoft OneDrive file operations.

- **`client/src/`**
  - `_app.tsx`: App layout and global providers (e.g., Auth).
  - `_document.tsx`: HTML structure, font/script optimizations.
  - `jpg-to-pdf.tsx`: Main UI for file conversion.
  - `types/index.ts`: TypeScript interfaces and types.
  - `utils/api.ts`: Axios API instance setup.
  - `utils/fileUtils.ts`: Utility functions (size formatting, etc.).

---

## 🔧 Backend (Nest.js)

### Structure

- **`server/src/auth/`**
  - `jwt.strategy.ts`: JWT authentication.
  - `google.strategy.ts`: Google OAuth strategy.
  - `microsoft.strategy.ts`: Microsoft OAuth strategy.
  - `jwt-auth.guard.ts`: Auth guard for protected routes.

- **`server/src/converters/`**
  - `jpg-to-pdf.service.ts`: Core PDF conversion logic.
  - `converters.controller.ts`: REST API endpoints.
  - `convert-file.dto.ts`: Validation DTOs for conversion input.

- **`server/src/storage/`**
  - Local and cloud storage service interfaces.
  - File cleanup scheduler for temporary files.

- **`server/src/config/`**
  - `typeorm.config.ts`: TypeORM database configuration.
  - `configuration.ts`: Environment variable loader.

---

## 🗄 Database

- **`database/`**
  - `schema.sql`: Initial PostgreSQL schema.
  - Migration templates for db evolution.
  - Seed data for test environments.

---

## 🐳 Infrastructure

- `docker-compose.yml`: Spins up PostgreSQL and Redis.
- Multi-stage `Dockerfile` for efficient builds.
- `.env.example`: Sample environment variables for production.

---

## ✅ Quality Assurance

### Frontend

- **Unit Tests:** Jest + Testing Library for React components.
- **E2E Tests:** Cypress for user conversion flows.

### Backend

- **Unit Tests:** Jest for service logic.
- **Integration Tests:** Supertest for API endpoints.

---

## 📚 Documentation

- **`README.md`:** Setup instructions and architecture overview (this file!).
- **API Docs:** Swagger/OpenAPI for backend endpoints.
- **Error Reference:** Documentation for error codes and troubleshooting.

---

## 🚀 Deployment Prep

- Production build scripts and Docker images.
- Health check endpoints for uptime monitoring.
- Rate limiting and security headers for safe operation.

---

## 🗂 Phase Breakdown

1. **Core Setup** (Week 1)
   - Monorepo + Docker environment
   - CI/CD pipeline

2. **Backend Services** (Week 2-3)
   - Authentication (JWT + OAuth)
   - Core PDF conversion
   - Storage (local/cloud)

3. **Frontend UI** (Week 4)
   - JPG-to-PDF conversion flow
   - Cloud storage integrations
   - Responsive, accessible design

4. **Testing** (Week 5)
   - Full unit and E2E coverage
   - Load and performance testing

5. **Deployment** (Week 6)
   - Staging and production environments
   - Monitoring and alerting setup
   - Finalize and publish documentation

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd jpg-to-pdf-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy and edit environment variables**
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

4. **Start development environment**
   ```bash
   docker-compose up --build
   ```

5. **Run tests**
   ```bash
   npm run test
   ```

---

## License

MIT License. See `LICENSE` file.

---
