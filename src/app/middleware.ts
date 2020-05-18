import { ServerRequest } from "https://deno.land/std/http/server.ts";
import ResponseContext from "./response.ts";

export type Handler = (
  req: ServerRequest,
  context?: ResponseContext | null,
) => Promise<any>;

export type Middleware = (
  req: ServerRequest,
  ctx: ResponseContext,
  middlewares:
    | ((req: ServerRequest, ctx: ResponseContext) => Promise<any>)
    | Handler,
) => Promise<ServerRequest>;

const composeMiddlewares = (
  handler: Handler,
  respond: (
    req: ServerRequest,
    ctx: ResponseContext | null,
    err: Error | null,
  ) => void,
  ctx: ResponseContext,
  middlewares = Array(),
) =>
  (req: ServerRequest) => {
    const chainMiddlewares = (
      [firstMiddleware, ...restOfMiddlewares]: Array<Middleware>,
    ):
      | ((req: ServerRequest, ctx: ResponseContext) => Promise<any>)
      | Handler => {
      if (firstMiddleware) {
        return (
          req: ServerRequest,
          ctx: ResponseContext,
        ): Promise<ServerRequest> => {
          try {
            const nextMiddlewards = chainMiddlewares(restOfMiddlewares);
            return firstMiddleware(req, ctx, nextMiddlewards);
          } catch (error) {
            return Promise.reject(error);
          }
        };
      }
      return handler;
    };

    chainMiddlewares(middlewares)(req, ctx)
      .then((ctx: ResponseContext) => respond(req, ctx, null))
      .catch((err: Error) => {
        respond(req, null, err);
      });
  };

export default composeMiddlewares;
