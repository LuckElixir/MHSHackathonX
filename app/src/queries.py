import asyncio
import aiosqlite
import sys

async def connect_db(query: str):
    async with aiosqlite.connect("db/data.db") as db:
        await db.execute(query)
        await db.commit()

if __name__ == "__main__":
    print(' '.join(sys.argv[1:]))
    asyncio.run(connect_db(' '.join(sys.argv[1:])))