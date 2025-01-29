import { NextFunction, Request, Response } from "express";

// Define the type for requestCounts
const requestCounts: Record<string, number> = {};

const rateLimit = 200;
const interval = 60 * 1000;

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;

  // first check if ip is valid
  if (!ip) {
    return res.status(400).json({
      status: false,
      message: "Invalid IP address",
    });
  }

  // Initialize the count if not present, and increment it
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  if (requestCounts[ip] > rateLimit) {
    return res.status(429).json({
      status: false,
      message: "Rate limit exceeded",
    });
  }

  // Optional: Reset the count after the interval
  setTimeout(() => {
    delete requestCounts[ip];
  }, interval);

  next();
};

export default rateLimiter;
