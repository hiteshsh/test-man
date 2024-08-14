import { axiosPrivate } from "../../utils/axios";

export async function onDeleteSuite(suiteId) {
  try {
    const response = await axiosPrivate.delete(`/testsuite/${suiteId}`);

    if (response.status === 200) {
      // Optionally update the UI after successful deletion
      console.log("Test Suite deleted successfully:", response.data);

      // You can trigger a state update or re-fetch the list of suites here
      // For example:
      // refreshTestSuites();
    } else {
      console.error("Failed to delete Test Suite:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while deleting Test Suite:", error);
  }
}

export async function getTestSuites() {
  try {
    const response = await axiosPrivate.get("testsuites");
    return response.data; // Return the test suites data
  } catch (error) {
    console.error("Error fetching test suites:", error);
    throw error; // Re-throw to handle it in the calling component
  }
}
