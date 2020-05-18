import app from './app/index.ts'

async function main() {
  console.log("Serving on port 8000");
  await app.listen({ port: 8000 });
}

export default main
