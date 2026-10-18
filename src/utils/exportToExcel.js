import * as XLSX from 'xlsx';

/**
 * Genera y descarga un archivo de Excel con los datos de las compras.
 * @param {Array} purchases - Lista de objetos con los datos de las compras.
 */
export const exportPurchasesToExcel = (purchases) => {
  if (!purchases || purchases.length === 0) return;

  const dataToExport = purchases.map((item, index) => ({
    'N° Orden': item.orderId || `ND-${1000 + index}`,
    'Fecha y Hora': item.date || new Date().toLocaleString('es-CO'),
    'Nombre del Cliente': item.clientName || 'N/A',
    'Identificación / Cédula': item.documentId || 'N/A',
    'Ciudad': item.city || 'N/A',
    'Teléfono': item.phone || 'N/A',
    'Vehículo / Modelo': item.carTitle || 'N/A',
    'Categoría': item.category || 'N/A',
    'Precio ($ USD)': item.price ? `$${Number(item.price).toLocaleString('es-CO')}` : '$0',
    'Estado de Pago': item.status || 'Completado (Simulación)'
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Compras NextDrive');

  worksheet['!cols'] = [
    { wch: 14 },
    { wch: 22 },
    { wch: 25 },
    { wch: 20 },
    { wch: 18 },
    { wch: 15 },
    { wch: 25 },
    { wch: 15 },
    { wch: 16 },
    { wch: 22 }
  ];

  const dateStr = new Date().toISOString().slice(0, 10);
  const fileName = `Reporte_Compras_NextDrive_${dateStr}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};