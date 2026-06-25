import express from "express";

import { serverConfig } from "./config.js";
import { errorHandler } from "./middleware/error.js";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { servicesRouter } from "./routes/services.js";
import { consultationsRouter } from "./routes/consultations.js";
import { ratingsRouter } from "./routes/ratings.js";
import { notificationsRouter } from "./routes/notifications.js";
import { adminRouter } from "./routes/admin.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json({ limit: "10mb" }));

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/services", servicesRouter);
  app.use("/api/consultations", consultationsRouter);
  app.use("/api/ratings", ratingsRouter);
  app.use("/api/notifications", notificationsRouter);
  app.use("/api/admin", adminRouter);

  app.use("/api", (_request, response) => {
    response.status(404).json({
      error: "API route not found.",
    });
  });

  if (serverConfig.isProduction) {
    app.use(express.static(serverConfig.clientDistDir));
    app.get(/.*/, (_request, response) => {
      response.sendFile(serverConfig.indexHtmlPath);
    });
  } else {
    app.use((_request, response) => {
      response.status(404).json({
        error: "The API server is running. Open the Vite preview URL for the app.",
      });
    });
  }

  app.use(errorHandler);

  return app;
}
