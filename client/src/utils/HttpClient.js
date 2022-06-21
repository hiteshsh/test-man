const axios = require("axios").default;

const DEFAULT_API_TIMEOUT_IN_MS = 30000;

class HttpClient {
  async get(options) {
    try {
      axios(options);
    } catch (error) {
      throw error;
    }
  }

  async post(options) {
    try {
        axios(options);
      } catch (error) {
        throw error;
      }
  }

  async put(options) {
   try {
      axios(options);
    } catch (error) {
      throw error;
    }
  }

  async delete(options) {
   try {
      axios(options);
    } catch (error) {
      throw error;
    }
  }
}
