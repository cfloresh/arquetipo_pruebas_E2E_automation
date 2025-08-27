import ExcelJS from 'exceljs';

// Función asíncrona para cargar datos desde Excel
export async function lecturaExcelData(sheetName: string, rowNumber: number) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('./data/DataDriven.xlsx');
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
        throw new Error(`La hoja con nombre "${sheetName}" no existe en el archivo Excel.`);
    }
    const rowValues = worksheet.getRow(rowNumber).values;
    return rowValues;
}