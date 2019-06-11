export function createError(status, msg) {
  const error = new Error(msg);
  error.status = status;
}