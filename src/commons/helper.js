export const formatPrice = cents => {
  return (cents / 10).toLocaleString('zh', {
    style: 'currency',
    currency: 'TWD'
  });
};