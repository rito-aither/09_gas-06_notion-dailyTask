const testgetTaskPage = () => {
    const diaryDbId =
        PropertiesService.getScriptProperties().getProperty('diaryDbId')
    const token = PropertiesService.getScriptProperties().getProperty('token')

    const resp = getTaskPage(diaryDbId, token)
    console.log(resp)

    let notiontasks = []
    for (const iterator of resp.results) {
        const properties = Object.values(iterator.properties)

        const id = iterator.id
        const taskname = properties[3].title[0].plain_text
        const date = properties[1].formula.string
        const check = properties[0].checkbox
        const url = iterator.url

        notiontasks.push([id, taskname, date, check, url])
    }
    console.log(notiontasks)
}

const testGetCreateTaskList = () => {
    getContentListFromSpreadsheet(taskSheetName)
}

const testCreateTaskList = () => {
    const diaryDbId =
        PropertiesService.getScriptProperties().getProperty('diaryDbId')
    const token = PropertiesService.getScriptProperties().getProperty('token')

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

const testInsertaddtasks = () => {
    const spreadsheet = SpreadsheetApp.openById(
        PropertiesService.getScriptProperties().getProperty('spreadSheetId')
    )
    const sheet = spreadsheet.getSheetByName(dbSheetName)

    const addtasks = testCreateTaskList()

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
