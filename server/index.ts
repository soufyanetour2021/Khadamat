import { createApp } from "./app.js";
import { serverConfig } from "./config.js";

const app = createApp();

const server = app.listen(serverConfig.port, serverConfig.host);

server.once("listening", () => {
  console.log(`[${serverConfig.serviceName}] API ready on :${serverConfig.port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `[${serverConfig.serviceName}] API port ${serverConfig.port} is already in use. ` +
        "Run `pnpm dev` to automatically select a free development port.",
    );
  } else {
    console.error(`[${serverConfig.serviceName}] API failed to start:`, error);
  }

  process.exit(1);
});
