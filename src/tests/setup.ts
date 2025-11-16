import { PostgreSqlContainer } from "@testcontainers/postgresql";

export async function setupDB() {
  const container = await new PostgreSqlContainer("postgres:16-alpine").start();
  process.env.DATABASE_URL = container.getConnectionUri();
  return container;
}
