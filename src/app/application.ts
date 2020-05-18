import {
  serve,
  ServerRequest,
  HTTPOptions,
} from "https://deno.land/std/http/server.ts";
import composeMiddlewares, { Middleware } from "./middleware.ts";
import ResponseContext from "./response.ts";

class Application {
  middlewares: Array<Middleware> = Array();

  async listen(config: string | HTTPOptions) {
    const s = serve(config);
    for await (const req of s) {
      composeMiddlewares(this.handler, this.respond, new ResponseContext(), this.middlewares)(
        req,
      );
    }
  }

  handler(req: ServerRequest, ctx?: ResponseContext | null) {
    return Promise.resolve(ctx);
  }

  respond(req: ServerRequest, ctx: ResponseContext | null, err: Error | null) {
    if (ctx) {
      req.respond(ctx!);
    }
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }
}

export default Application;
