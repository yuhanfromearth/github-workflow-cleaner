import { getAllWorkflowRuns, deleteWorkflowRuns } from "./services/github.js";

/**
 * Main application function
 */
async function main() {
  try {
    // Fetch all cancelled workflow runs
    const runIds = await getAllWorkflowRuns("failure");
    console.log(`Total workflow runs retrieved: ${runIds.length}`);

    // Delete the retrieved workflow runs
    await deleteWorkflowRuns(runIds);
    console.log(`Successfully deleted ${runIds.length} workflow runs`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Execute main function
main();
