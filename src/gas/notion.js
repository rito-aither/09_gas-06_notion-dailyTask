// Create a common header object for Notion API
const notionHeader = (token) => ({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    'Notion-Version': '2021-08-16',
})

// Create a diary page for the given date
const createTaskPage = (dbId, token,taskName) => {
    const url = `https://api.notion.com/v1/pages`

    const body = {
        parent: {
            database_id: dbId,
        },
        // タイトル
        properties: {
            // Name: {
                title: [
                    {
                        text: {
                            content: `${taskName} | ${jaToday}(${dayOfWeek})`,
                        },
                    },
                ],
            // },
        },
    }
    const options = {
        method: 'post',
        headers: notionHeader(token),
        payload: JSON.stringify(body),
    }
    const resp = UrlFetchApp.fetch(url, options)
    return JSON.parse(resp.getContentText())
}

// Create a diary page for the given date
const getTaskPage = (dbId,token) => {
    const url = `https://api.notion.com/v1/databases/${dbId}/query`

    const options = {
        method: 'post',
        headers: notionHeader(token),
    }
    const resp = UrlFetchApp.fetch(url, options)
    return JSON.parse(resp.getContentText())
}

// 配列をnotionAPIに投げれる形に
const createDiaryPageContentList = (contentList) => {
    const diaryPageContentList = contentList.map((content) => {
        console.log(content[0])
        return {
            object: 'block',
            type: 'heading_3',
            heading_3: {
                text: [{ type: 'text', text: { content: content[0] } }],
            },
        }
    })

    console.log(diaryPageContentList)

    return diaryPageContentList
}
