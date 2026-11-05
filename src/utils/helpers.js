import Swal from 'sweetalert2';

export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value || 0);
}

export const showAlert = {
  success: (title, text) => {
    Swal.fire({
      title,
      text,
      icon: 'success',
      background: '#090d16',
      color: '#f8fafc',
      confirmButtonColor: '#eab308'
    });
  },
  error: (title, text) => {
    Swal.fire({
      title,
      text,
      icon: 'error',
      background: '#090d16',
      color: '#f8fafc',
      confirmButtonColor: '#ef4444'
    });
  },
  confirm: async (title, text) => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      background: '#090d16',
      color: '#f8fafc',
      confirmButtonColor: '#eab308',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }
};