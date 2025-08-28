import XLSX from 'xlsx';

// Función para cargar datos desde Excel
export async function lecturaExcelData(sheetName: string, rowNumber: number) {
    const workbook = XLSX.readFile('./data/DataDriven.xlsx');
    const worksheet = workbook.Sheets[sheetName];
    // Convertir la hoja de trabajo a un objeto JSON
    const records = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

    // Retornar la fila específica como un objeto de pares clave-valor
    // Supongamos que la primera fila del Excel contiene los encabezados de columna
    const headers = records[0];
    const row = records[rowNumber - 1]; // Row is 1-based index
    const rowData: any = {};

    // Emparejar encabezados con los valores para crear un objeto
    for (let i = 0; i < headers.length; i++) {
        rowData[headers[i]] = row[i];
    }

    return rowData;
}