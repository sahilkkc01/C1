import * as XLSX from "xlsx";

export default function DownloadExcel(data, deleteColumnsName, fileName, transformations = []) {
  // Add SN and apply transformations
  const transformedData = data.map((report, index) => {
    let newReport = {
      SN: index + 1,
      ...report,
    };

    transformations.forEach((transformation) => {
      if (transformation.type === "add") {
        newReport[transformation.newKey] = transformation.value;
      } else if (
        transformation.type === "rename" &&
        newReport[transformation.oldKey]
      ) {
        newReport[transformation.newKey] = newReport[transformation.oldKey];
        delete newReport[transformation.oldKey];
      }
    });

    return newReport;
  });

  // Filter columns to delete
  const dataFiltered = deleteColumnsForDownload(transformedData, deleteColumnsName);

  // Create and download Excel file
  const worksheet = XLSX.utils.json_to_sheet(dataFiltered);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const deleteColumnsForDownload = (data, columnsToDelete) => {
  return data.map((item) => {
    columnsToDelete.forEach((column) => {
      delete item[column];
    });
    return item;
  });
};
