const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5050"
    : "http://localhost:5050";
export default baseUrl;
