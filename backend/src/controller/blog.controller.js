import { db } from '../db/db.js';
import { blogs } from '../db/schema.js';
import { eq, like, asc, desc, count, sql } from 'drizzle-orm';
import { parsePagination, buildPaginationResponse } from '../utils/pagination.js';
import { success, created, notFound, paginated, error } from '../utils/response.js';

export const getBlogs = async (req, res) => {
  try {
    const { pageNum, limit, offset, search, sortField, sortOrder } = parsePagination(req.query);

    const orderFn = sortOrder === 'asc' ? asc : desc;
    const sortColumn = blogs[sortField] || blogs.createdAt;

    let whereClause;
    if (search) {
      const term = `%${search}%`;
      whereClause = like(blogs.title, term);
    }

    const totalResult = await db
      .select({ total: count() })
      .from(blogs)
      .where(whereClause);

    const total = totalResult[0]?.total ?? 0;

    const rows = await db
      .select()
      .from(blogs)
      .where(whereClause)
      .orderBy(orderFn(sortColumn))
      .limit(limit)
      .offset(offset);

    paginated(res, rows, buildPaginationResponse(total, pageNum, limit));
  } catch (err) {
    console.error('Error fetching blogs:', err);
    error(res, 'Failed to fetch blogs');
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const row = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, parseInt(id)))
      .limit(1);

    if (!row.length) {
      return notFound(res, 'Blog');
    }

    success(res, row[0]);
  } catch (err) {
    console.error('Error fetching blog:', err);
    error(res, 'Failed to fetch blog');
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, coverImage } = req.body;

    if (!title) {
      return error(res, 'Title is required', 400);
    }

    const [row] = await db
      .insert(blogs)
      .values({
        title,
        content: content || '',
        tags: tags || [],
        coverImage: coverImage || null,
      })
      .returning();

    created(res, row);
  } catch (err) {
    console.error('Error creating blog:', err);
    error(res, 'Failed to create blog');
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, coverImage } = req.body;

    const existing = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, parseInt(id)))
      .limit(1);

    if (!existing.length) {
      return notFound(res, 'Blog');
    }

    const [row] = await db
      .update(blogs)
      .set({
        title: title ?? existing[0].title,
        content: content ?? existing[0].content,
        tags: tags !== undefined ? tags : existing[0].tags,
        coverImage:
          coverImage !== undefined ? coverImage : existing[0].coverImage,
        updatedAt: sql`NOW()`,
      })
      .where(eq(blogs.id, parseInt(id)))
      .returning();

    success(res, row);
  } catch (err) {
    console.error('Error updating blog:', err);
    error(res, 'Failed to update blog');
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, parseInt(id)))
      .limit(1);

    if (!existing.length) {
      return notFound(res, 'Blog');
    }

    await db.delete(blogs).where(eq(blogs.id, parseInt(id)));

    success(res, { message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    error(res, 'Failed to delete blog');
  }
};
