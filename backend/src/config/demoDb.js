// Demo mode: spin up an in-memory MongoDB when no MONGODB_URI is configured, so
// the app runs locally with zero external setup. The binary downloads once on
// first run (needs internet, but no database account).
let mem = null;

export async function startMemoryMongo() {
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  mem = await MongoMemoryServer.create();
  return mem.getUri('sacred_knowledge');
}

export async function stopMemoryMongo() {
  if (mem) await mem.stop();
}
