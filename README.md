# Dino's Deno Cloud Coverage App

A simple application that serves an image of Dino's and overlays clouds based on the current cloud coverage of the restaurant.

This project was built to experiement with the [Deno](https://github.com/denoland/deno) JS/ Typscript runtime.

It requires file permission to serve static files, env permission to read environment variables and net permission for the web server.

Requires setting a [climacell](https://developer.climacell.co/v3/docs) api key to get the weather
`CLIMACELL_API_KEY`

### Run

```
$ deno run --allow-net --allow-read --allow-env mod.ts
```

### Development
This project uses [drun](https://deno.land/x/drun/) to automatically restart.

[config](./drun.json)
```
$ drun
Serving on port 8000
```

### Dependencies
Deps are declared and imported from `deps.ts`

[React](https://github.com/facebook/react)

