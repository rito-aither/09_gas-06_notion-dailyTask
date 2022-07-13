function setPropertys() {
    const value = {
        diaryDbId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        spreadSheetId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    }

    PropertiesService.getScriptProperties().setProperties(value)
}
