const scriptProperties = PropertiesService.getScriptProperties()
const spreadsheetId = scriptProperties.getProperty('spreadSheetId')
const diaryDbId = scriptProperties.getProperty('diaryDbId')
const token = PropertiesService.getScriptProperties().getProperty('token')
const dbSheetName = 'db'
const taskSheetName = 'タスク'

const date = new Date()
const jaToday = date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }) // e.g. 2021/7/3
const jaDate = jaToday.split('/')
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
    date.getDay()
]

// 定時実行する関数
const creatTasksAndInsertaddtasks = () => {
    const spreadsheet = spreadSheetInit(spreadsheetId, dbSheetName)
    const sheet = spreadsheet.sheet

    const addtasks = createTaskList()

    let value = []

    for (const iterator of addtasks) {
        const properties = Object.values(iterator.properties)

        const id = iterator.id
        const tasknametext = properties[3].title[0].plain_text
        const url = iterator.url
        const check = false
        value.push([id, tasknametext, jaToday, false, url])
    }
    console.log(value)

    updateRow(sheet, sheet.getLastRow() + 1, value)
}
/**
 *定期実行して、notionのタスクが完了してるか確認
 *
 */
const compareTasks = () => {
    const spreadsheet = spreadSheetInit(spreadsheetId, dbSheetName)
    const sheet = spreadsheet.sheet

    const notionTasks = getNotionTasks()
    const sheetTasks = sheet
        .getRange(2, 1, sheet.getLastRow() - 1, 5)
        .getValues()

    let results = []
    for (const iterator of notionTasks) {
        const notionTask = iterator
        for (const iterator of sheetTasks) {
            const sheetTask = iterator

            if (notionTask[0] === sheetTask[0] && notionTask[3] !=sheetTask[3] ) {
                console.log('notionのタスクが完了したためシートを更新します')
                results.push(notionTask[0])
            }
        }
    }

    console.log(results);

    if (results.length === 0) {
        return
    }

    for (const iterator of results) {

        const rowNumber = getRowNumber(sheet, 1, iterator)
        console.log(rowNumber);
        const value = [[true]]

        updateCell(sheet, rowNumber, 4,value)
    }
}

/**
 *
 * notionのタスクを持ってきてパース
 * @return {*}
 */
const getNotionTasks = () => {
    const resp = getTaskPage(diaryDbId, token)
    console.log(resp)

    let notionTasks = []
    for (const iterator of resp.results) {
        const properties = Object.values(iterator.properties)

        const id = iterator.id
        const taskname = properties[3].title[0].plain_text
        const date = properties[1].formula.string
        const check = properties[0].checkbox
        const url = iterator.url

        notionTasks.push([id, taskname, date, check, url])
    }
    console.log(notionTasks)

    return notionTasks
}

/**
 *タスクを一括作成
 *
 * @return {*}
 */
const createTaskList = () => {
    const taskList = getContentListFromSpreadsheet(taskSheetName)
    let addtasks = []
    for (const iterator of taskList) {
        console.log(iterator[0])
        const resp = createTaskPage(diaryDbId, token, iterator[0])
        console.log(resp)
        addtasks.push(resp)
    }

    return addtasks
}

// 内容の目次をspreadsheetから取得
const getContentListFromSpreadsheet = (sheetName) => {
    const spreadsheet = SpreadsheetApp.openById(
        PropertiesService.getScriptProperties().getProperty('spreadSheetId')
    )
    const sheet = spreadsheet.getSheetByName(sheetName)

    const contentList = sheet
        .getRange(
            2, //2行目から取得 1列取得
            1,
            sheet.getLastRow() - 1,
            sheet.getLastColumn()
        )
        .getValues()

    console.log(contentList)
    return contentList
}
