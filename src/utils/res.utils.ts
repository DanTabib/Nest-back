export const _res = (data?: any, message?: string, statusCode?: number) => {
  return {
    data: data || null,
    message: message || '',
    statusCode: statusCode || 200,
  };
};
