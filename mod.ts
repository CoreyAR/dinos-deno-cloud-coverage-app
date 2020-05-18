import main from "./src/index.ts";

if (import.meta.main) {
  try {
    await main();
  } catch (err) {
    console.error(err); // TODO Change to Deno.log
    Deno.exit(1);
  }
}
