export function parsePagination(query) {
  const { page = 1, pageSize = 10, search, sortField = 'createdAt', sortOrder = 'desc' } = query;

  const pageNum = Math.max(1, parseInt(page));
  const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
  const offset = (pageNum - 1) * limit;

  return { pageNum, limit, offset, search, sortField, sortOrder };
}

export function buildPaginationResponse(total, pageNum, limit) {
  return {
    page: pageNum,
    pageSize: limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
