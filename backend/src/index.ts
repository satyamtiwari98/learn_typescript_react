import express, { Request, Response } from "express";
import generatePassword from "generate-password";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow only requests from this origin (adjust if necessary)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow methods (customize as needed)
  allowedHeaders: ["Content-Type", "Authorization"], // Customize allowed headers
};

// Use the CORS middleware with the configured options
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express server!");
});

app.get("/generate-password", (req: Request, res: Response) => {
  const {
    length = "12",
    numbers = "true",
    symbols = "true",
    uppercase = "true",
    lowercase = "true",
    strict = "true",
  } = req.query;

  const password = generatePassword.generate({
    length: parseInt(length as string, 10),
    numbers: numbers === "true",
    symbols: symbols === "true",
    uppercase: uppercase === "true",
    lowercase: lowercase === "true",
    strict: strict === "true",
  });

  res.json({ password });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
