export function success(res, data, status = 200) {
  return res.status(status).json({ data });
}

export function created(res, data) {
  return success(res, data, 201);
}

export function error(res, message, status = 500) {
  return res.status(status).json({ message });
}

export function notFound(res, resource = 'Resource') {
  return error(res, `${resource} not found`, 404);
}

export function paginated(res, data, pagination) {
  return res.status(200).json({ data, pagination });
}
