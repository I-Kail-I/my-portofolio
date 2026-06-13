import { db } from '../db/db.js';
import { experiences } from '../db/schema.js';
import { eq, like, or, asc, desc, count, sql } from 'drizzle-orm';

export const getExperiences = async (req, res) => {
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
    const sortColumn = experiences[sortField] || experiences.createdAt;

    let whereClause;
    if (search) {
      const term = `%${search}%`;
      whereClause = or(
        like(experiences.title, term),
        like(experiences.subheading, term),
      );
    }

    const totalResult = await db
      .select({ total: count() })
      .from(experiences)
      .where(whereClause);

    const total = totalResult[0]?.total ?? 0;

    const rows = await db
      .select()
      .from(experiences)
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
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Failed to fetch experiences' });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const row = await db
      .select()
      .from(experiences)
      .where(eq(experiences.id, parseInt(id)))
      .limit(1);

    if (!row.length) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ data: row[0] });
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Failed to fetch experience' });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { title, subheading, startDate, endDate, description } = req.body;

    if (!title || !subheading || !startDate) {
      return res
        .status(400)
        .json({ message: 'Title, subheading, and start date are required' });
    }

    const [row] = await db
      .insert(experiences)
      .values({
        title,
        subheading,
        startDate,
        endDate: endDate || null,
        description: description || '',
      })
      .returning();

    res.status(201).json({ data: row });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ message: 'Failed to create experience' });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subheading, startDate, endDate, description } = req.body;

    const existing = await db
      .select()
      .from(experiences)
      .where(eq(experiences.id, parseInt(id)))
      .limit(1);

    if (!existing.length) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const [row] = await db
      .update(experiences)
      .set({
        title: title ?? existing[0].title,
        subheading: subheading ?? existing[0].subheading,
        startDate: startDate ?? existing[0].startDate,
        endDate: endDate !== undefined ? endDate : existing[0].endDate,
        description: description ?? existing[0].description,
        updatedAt: sql`NOW()`,
      })
      .where(eq(experiences.id, parseInt(id)))
      .returning();

    res.status(200).json({ data: row });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ message: 'Failed to update experience' });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db
      .select()
      .from(experiences)
      .where(eq(experiences.id, parseInt(id)))
      .limit(1);

    if (!existing.length) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    await db
      .delete(experiences)
      .where(eq(experiences.id, parseInt(id)));

    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ message: 'Failed to delete experience' });
  }
};
