import { db } from '../db/db.js';
import { experiences } from '../db/schema.js';
import { eq, like, or, asc, desc, count, sql } from 'drizzle-orm';
import { parsePagination, buildPaginationResponse } from '../utils/pagination.js';
import { success, created, notFound, paginated, error } from '../utils/response.js';

export const getExperiences = async (req, res) => {
  try {
    const { pageNum, limit, offset, search, sortField, sortOrder } = parsePagination(req.query);

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

    paginated(res, rows, buildPaginationResponse(total, pageNum, limit));
  } catch (err) {
    console.error('Error fetching experiences:', err);
    error(res, 'Failed to fetch experiences');
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
      return notFound(res, 'Experience');
    }

    success(res, row[0]);
  } catch (err) {
    console.error('Error fetching experience:', err);
    error(res, 'Failed to fetch experience');
  }
};

export const createExperience = async (req, res) => {
  try {
    const { title, subheading, startDate, endDate, description } = req.body;

    if (!title || !subheading || !startDate) {
      return error(res, 'Title, subheading, and start date are required', 400);
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

    created(res, row);
  } catch (err) {
    console.error('Error creating experience:', err);
    error(res, 'Failed to create experience');
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
      return notFound(res, 'Experience');
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

    success(res, row);
  } catch (err) {
    console.error('Error updating experience:', err);
    error(res, 'Failed to update experience');
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
      return notFound(res, 'Experience');
    }

    await db
      .delete(experiences)
      .where(eq(experiences.id, parseInt(id)));

    success(res, { message: 'Experience deleted successfully' });
  } catch (err) {
    console.error('Error deleting experience:', err);
    error(res, 'Failed to delete experience');
  }
};
