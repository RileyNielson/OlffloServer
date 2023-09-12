import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import users from "./routes/users.mjs"
import projects from "./routes/projects.mjs";

const PORT = process.env.PORT || 5050;
const app = express();
const corsOptions = {
  origin: ["https://olfflo.com", "https://olfflo.com/signUp", "https://olfflo.com/login","http://localhost:3000"]
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '2MB' }));

app.use("/users", users);
app.use("/projects", projects);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});