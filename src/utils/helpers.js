export const formatCOP = (amount) => {
  const numericAmount = Number(amount) || 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericAmount);
};

export const showAlert = {
  success: (title, text) => {
    // Si usas SweetAlert2
    console.log(`${title}: ${text}`);
  }
};