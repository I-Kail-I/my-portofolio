import { db } from '../db/db.js';
import { blogs } from '../db/schema.js';
import { eq, like, asc, desc, count, sql } from 'drizzle-orm';

export const getBlogs = async (req, res) => {
  try {
    const {
      search,
      sortField = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const offset = (pageNum - 1) * limit;

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

    res.status(200).json({
      data: rows,
      pagination: {
        page: pageNum,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
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
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ data: row[0] });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, coverImage } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
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

    res.status(201).json({ data: row });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog' });
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
      return res.status(404).json({ message: 'Blog not found' });
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

    res.status(200).json({ data: row });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog' });
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
      return res.status(404).json({ message: 'Blog not found' });
    }

    await db.delete(blogs).where(eq(blogs.id, parseInt(id)));

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};
