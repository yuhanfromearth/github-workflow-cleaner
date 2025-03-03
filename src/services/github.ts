import { octokit, OWNER, REPO, GITHUB_API_VERSION } from "../config.js";
import { GitHubRunStatus } from "../types.js";

/**
 * Fetches all workflow runs with optional status filter
 */
export async function getAllWorkflowRuns(
  status: GitHubRunStatus = undefined,
): Promise<number[]> {
  const run_ids: number[] = [];
  let page = 1;
  const per_page = 100; // Maximum allowed by GitHub API
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`Fetching page ${page}...`);

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/runs",
      {
        owner: OWNER,
        repo: REPO,
        per_page,
        page,
        status,
        headers: {
          "X-GitHub-Api-Version": GITHUB_API_VERSION,
        },
      },
    );

    const runs = response.data.workflow_runs;

    for (let run of runs) {
      run_ids.push(run.id);
    }

    // If there are 100 or more runs remaining, the API returns 100 runs for the current page
    // hence, we are not on the last page
    if (runs.length < per_page) {
      hasNextPage = false;
    } else {
      page++;
    }

    console.log(
      `Retrieved ${runs.length} runs on this page. Total so far: ${run_ids.length}`,
    );
  }

  return run_ids;
}

/**
 * Deletes a list of workflow runs by their IDs
 */
export async function deleteWorkflowRuns(runIds: number[]): Promise<void> {
  for (const runId of runIds) {
    await octokit.request(
      "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}",
      {
        owner: OWNER,
        repo: REPO,
        run_id: runId,
        headers: {
          "X-GitHub-Api-Version": GITHUB_API_VERSION,
        },
      },
    );
  }
}
