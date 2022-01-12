import request from "supertest";
import reporter from "../helper/reporter";

async function GET(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  queryParam: object
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `Given baseURL: ${baseURL}, endpoint: ${endpoint} are not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a GET to ${endpoint}`);
  try {
    return await request(baseURL)
      .get(endpoint)
      .query(queryParam)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
  } catch (error) {
    error.message = `Error making a GET call to ${endpoint}, ${error.message}`;
    throw error;
  }
}

async function POST(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  payload: object
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `Given baseURL: ${baseURL}, endpoint: ${endpoint} are not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a POST to ${endpoint}`);
  try {
    return await request(baseURL)
      .post(endpoint)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
  } catch (error) {
    error.message = `Error making a GET call to ${endpoint}, ${error.message}`;
    throw error;
  }
}

export default { GET, POST };
/**
 * "https://reqres.in"
 *"/api/users
 *
 *
 */
