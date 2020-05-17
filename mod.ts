import App from "./src/index.ts";

async function main() {
  console.log("Serving on port 8000");
  await App.listen({ port: 8000 });
}

if (import.meta.main) {
  try {
    await main();
  } catch (err) {
    console.error(err); // TODO Change to Deno.log
    Deno.exit(1);
  }
}

