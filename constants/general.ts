const domain =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN!
    : "http://localhost:3000";

export default domain;
