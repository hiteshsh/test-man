const whitelist = [
  "http://127.0.0.1:5002",
  "http://localhost:5002",
  "https://www.google.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
