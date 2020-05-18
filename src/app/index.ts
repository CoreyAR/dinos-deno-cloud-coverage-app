import {
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";
import Index from "../view/index.tsx";
import getWeather from "../weather.ts";
import ResponseContext from "./response.ts";
import Application from "./application.ts";

const app = new Application();

// Static middleware
const staticFiles = async (
  req: ServerRequest,
  ctx: ResponseContext,
  next: any,
) => {
  if (req.url.startsWith("/static")) {
    const { status, body, headers } = await serveFile(
      req,
      `${Deno.cwd()}${req.url}`,
    );
    ctx.update({ status, body, headers });
  }
  return next(req, ctx);
};

// Naively direct all routes to the single view
const indexRoute = async (
  req: ServerRequest,
  ctx: ResponseContext,
  next: any,
) => {
  if (!req.url.startsWith("/static")) {
    const data = await getWeather();
    ctx.update({ body: Index(data), status: 200 });
  }
  return next(req, ctx);
};

// Order of the routes is significant because response context is being mutated by each middleware
app.use(indexRoute);
app.use(staticFiles);

export default app;
