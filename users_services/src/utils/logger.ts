import fs from "fs";
import path from "path";

// export default logger;

const getLogFileName = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}.log`;
};

// Create logs directory and initialize write stream with error handling
const logsDir = path.join(process.cwd(), "logs");

const createLog = () => {
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const logFilePath = path.join(logsDir, getLogFileName());

    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, "");
    }
    const errorLogStream = fs.createWriteStream(logFilePath, { flags: "a" });
    return errorLogStream;
  } catch (error) {
    console.error("Error setting up log file:", error);
    throw new Error("Failed to set up log file");
  }
};

export default createLog;
