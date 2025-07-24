
const Exceljs = require('exceljs'); //Imports the exceljs library, which is used to read, write, and manipulate Excel files in Node.js.

async function Read_ExceljsTest() //Defines an asynchronous function ExceljsTest. It's marked async because some ExcelJS operations (like reading a file) return promises and must be awaited.
{
    const Workbook = new Exceljs.Workbook();//Creates a new Excel workbook instance. A workbook represents the entire Excel file (can contain multiple sheets).
    await Workbook.xlsx.readFile("C:/Users/Pavuluru.Rajani/Downloads/RajaniExcel.xlsx"); //Loads the Excel file from your system. The await ensures the file is completely read before continuing.
    const worksheet = Workbook.getWorksheet('Sheet1'); ////Gets the worksheet named 'Sheet1' from the workbook. If the sheet name is incorrect or doesn’t exist, it will return undefined
    // Log the number of rows
    console.log("Total Rows:", worksheet.rowCount);
    
    worksheet.eachRow( (row,rowNumber)=>{     // Loops through each row in the worksheet. The callback gives you: row: the actual row object, rowNumber: the row’s position in the sheet.
        //console.log("Row Number : " +rowNumber);
        row.eachCell( (cell,colNumber)=>{    //Loops through each cell in the current row. The callback provides:cell: the cell object,colNumber: the column number of the cell.
            //console.log("col Number : " +colNumber);
            console.log("Cell Value: ", cell.value);
        })

    })
}

//This line calls the function and starts the process.
Read_ExceljsTest();

async function Write_ExceljsTest()
{
    //Create an object to store column number and rownumber for using outside
    let output = {Rows:-1, Cols:-1};
    const wb = new Exceljs.Workbook();
    await wb.xlsx.readFile("C:/Users/Pavuluru.Rajani/Downloads/RajaniExcel.xlsx");
    const ws = wb.getWorksheet("Sheet1");
    ws.eachRow( (row,rowNumber)=>{
        row.eachCell( (cell,colNumber)=>{
            if (cell.value === "Kivi")
            {
                output.Rows = rowNumber;
                output.Cols = colNumber;
            }

        })

    })
    const cellvalue = ws.getCell(output.Rows,output.Cols);
    cellvalue.value  = "Kiwi"
    await wb.xlsx.writeFile("C:/Users/Pavuluru.Rajani/Downloads/RajaniExcel.xlsx");
    
}
Write_ExceljsTest();
