# GitHub Workflow Cleaner

A utility for managing GitHub Actions workflow runs (for now, may add GitHub API functionality later). This tool helps you clean up your GitHub Actions workflow history by retrieving and deleting runs based on their status.

## Features

- Fetch all workflow runs with optional status filtering
- Delete workflow runs in bulk
- Configurable for any GitHub repository

## Installation
1. Install dependencies with `npm`:
   ```
   npm install
   ```
2. Create a `.env` file based on the `.env.example`:
   ```
   GIT_HUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
   ```

## Configuration

Edit the `src/config.ts` file to set your GitHub repository details:

```typescript
export const OWNER = "your-username";
export const REPO = "your-repository";
```

## Usage

To build and run the application:

```bash
npm run cleaner
```

The default behavior will fetch all failed workflow runs and delete them.

## Available Scripts

- `npm run build` - Compiles TypeScript code
- `npm run start` - Runs the compiled application
- `npm run dev` - Compiles and runs the application
- `npm run cleaner` - Compiles and runs the workflow cleaner tool (currently actually same as dev 🤭)

## GitHub Personal Access Token

You need a GitHub Personal Access Token with appropriate permissions:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with the `repo` and `workflow` scopes
3. Add this token to your `.env` file

## License

MIT
