import { Application, Router, Context, send } from "./deps.ts";
import App from "./app/index.tsx";
import getWeather from "./weather.ts";

const app = new Application();

const router = new Router();
router
  .get("/", async (ctx: Context) => {
    const data = await getWeather();
    ctx.response.body = App(data);
  });

app.use(router.routes());
app.use(router.allowedMethods());

// Static middleware
app.use(async (ctx: Context) => {
  if (ctx.request.url.pathname.includes("static")) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}`,
      index: "index.html",
    });
  }
});
console.log("serving");
await app.listen({ port: 8000 });
