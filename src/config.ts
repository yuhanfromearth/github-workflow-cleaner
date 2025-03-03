import { configDotenv } from "dotenv";
import { Octokit } from "@octokit/core";

// Load environment variables
configDotenv();

// GitHub API config
export const OWNER = "yuhanfromearth";
export const REPO = "spotify-rss-generator";
export const GITHUB_API_VERSION = "2022-11-28";

// Create Octokit instance
export const octokit = new Octokit({
  auth: process.env.GIT_HUB_PERSONAL_ACCESS_TOKEN,
});