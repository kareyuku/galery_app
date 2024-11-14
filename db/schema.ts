import { mysqlTable, text, int, varchar, primaryKey } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  avatar: varchar({ length: 255 }),
  rank: varchar({ length: 50 }).default("user")
});

export const albumsTable = mysqlTable("albums", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  userId: int("user_id").notNull()
});

export const postsTable = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement(),
  albumId: int("album_id"),
  userId: int("user_id").notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text("description"),
});

export const likesTable = mysqlTable(
  "likes",
  {
    userId: int("user_id").notNull(),
    postId: int("post_id").notNull(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.postId),
  })
);

export const comments = mysqlTable("comments", {
  id: int("id").primaryKey().autoincrement(),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
  content: text("content").notNull(),
});
