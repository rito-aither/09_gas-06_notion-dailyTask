/**
 * スプレッドシート管理
 * @param targetSheetName:string
 * @param sheetId : string
 */
function spreadSheetInit(sheetId, targetSheetName) {
    // targetSheetNameでシートを初期化
    const book = SpreadsheetApp.openById(sheetId)

    if (!book) {
        throw new Error('スプレッドシードがみつかりません')
    }
    const sheet = book
        .getSheets()
        .find((sheet) => sheet.getName() === targetSheetName)

    if (!sheet) {
        throw new Error('シートが存在しません')
    }

    return { book: book, sheet: sheet }
}


/**
 *
 *カラム名取得
 * @param {*} sheet
 * @returns array[][]
 */
function getFirstRow(sheet) {
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()
}


/**
 *
 *カラム名からカラムの列番号取得
 * @param {*} sheet
 * @param {*} columnName
 * @returns Int
 */
function getColumnNumber(sheet, columnName) {
    const columns = getFirstRow(sheet)

    let result = ''
    columns[0].forEach((column, index) => {
        // console.log(`${index}: ${column}`)
        if (columnName == column) {
            console.log('currentNumber')
            result = index + 1
        }
    })

    console.log('resultCoumnNumber' + result)
    return result
}

/**
 *
 *対象カラムでrowNameに一致する列番号を返す
 * @param {*} sheet
 * @param {*} columnNumber
 * @param {*} rowName
 * @returns Int
 */
function getRowNumber(sheet, columnNumber, rowName) {
    const row = getSelectOneColumn(sheet, columnNumber)

    let result = ''
    row.forEach((row, index) => {
        // console.log(`${index}: ${row}`)
        if (row[0] == rowName) {
            console.log('currentNumber')
            result = index + 2
        }
    })

    console.log('resultRowNumber:' + result)
    return result
}

/**
 *
 *対象カラム列すべて取得
 * @param {*} sheet
 * @param {*} columnNumber
 * @returns array[][]
 */
function getSelectOneColumn(sheet, columnNumber) {
    return sheet.getRange(2, columnNumber, sheet.getLastRow(), columnNumber).getValues()
}

/**
 *
 *対象の行取得
 * @param {*} sheet
 * @param {*} RowNumber
 * @returns arryay [][]
 */
function getSelectOneRow(sheet, RowNumber) {
    return sheet.getRange(RowNumber, 1, RowNumber, sheet.getLastColumn()).getValues()
}

/**
 *
 * 対象の行更新
 * @param {*} sheet
 * @param {*} RowNumber
 * @param {*} value
 */
function updateRow(sheet, RowNumber, value) {
    sheet.getRange(RowNumber, 1, value.length, value[0].length).setValues(value)
}

/**
 *
 * 対象のセル更新
 * @param {*} sheet
 * @param {*} rowNumber
 * @param {*} columnNumber
 * @param {*} value
 */
 function updateCell(sheet, rowNumber, columnNumber ,value) {
    sheet.getRange(rowNumber, columnNumber, value.length, value[0].length).setValues(value)
}
