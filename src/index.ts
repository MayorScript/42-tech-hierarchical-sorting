import * as fs from "fs";

interface Row {
  [key: string]: string | number; //Column names and values can be strings or numbers
}

/**
 * Time Complexity: O(n*m)
 * Space Complexity: O(n*m)
 * @param input
 * @returns
 */
function parseCSVFile(input: string): Row[] {
  const lines = input.split("\n");
  const headers = lines[0].trim().split("|");
  return lines.slice(1).map((line) => {
    const values = line.trim().split("|");
    if (values.length !== headers.length) {
      throw new Error("CSV format error: Row does not match header length.");
    }
    const row: Row = {};
    headers.forEach((header, index) => {
      row[header] = isNaN(Number(values[index]))
        ? values[index]
        : Number(values[index]);
    });
    return row;
  });
}

/**
 * Time Complexity: O(n*m)
 * Space Complexity: O(n*m)
 * @param outputFile
 * @param data
 */
function storeCSVFile(outputFile: string, data: Row[]): void {
  try {
    const headers = Object.keys(data[0]).join("|");
    const content = data.map((row) => Object.values(row).join("|")).join("\n");
    fs.writeFileSync(outputFile, `${headers}\n${content}`);
  } catch (error) {
    console.error("Failed to write CSV:", error);
  }
}

/**
 * Time Complexity: O(n log n)
 * Space Complexity: O(n log n)
 * @param rows
 * @param sortingMetric
 * @returns
 */
function hierarchicalSort(rows: Row[], sortingMetric: string): Row[] {
  // Validates that the sorting metric exists in the row data
  if (!rows[0] || !rows[0].hasOwnProperty(sortingMetric)) {
    throw new Error(
      `Sorting metric '${sortingMetric}' does not exist in the data.`,
    );
  }

  rows.sort((a, b) => {
    // Checks if either row is '$total' row, giving them priority in the sort order
    const aTotal = Object.values(a).some((value) => value === "$total");
    const bTotal = Object.values(b).some((value) => value === "$total");

    // Move $total rows to the beginning
    if (aTotal && !bTotal) return -1;
    if (!aTotal && bTotal) return 1;

    //Rows not marked as '$total', sorts based on the specified metric, descending
    return (b[sortingMetric] as number) - (a[sortingMetric] as number);
  });

  return rows;
}

/**
 * Immediately Invoked Function Expression
 * Just to ensure it runs as the script loads
 */
(function main() {
  try {
    const inputData = fs.readFileSync("src/input/data-big-input.txt", "utf-8");
    const rows = parseCSVFile(inputData);

    const sortingMetric = "net_sales_units"; // Dynamic sorting metric
    const sortedRows = hierarchicalSort(rows, sortingMetric);

    storeCSVFile("src/output/data-big-output.txt", sortedRows);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
