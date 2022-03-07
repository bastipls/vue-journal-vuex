import journalApi from "../../../../api/journalApi"

export const loadEntries = async ({commit}) =>{
    const {data }  = await journalApi.get('/entries.json')
    const entries = []
    if(!data) {
        commit('setEntries',[])
        return
    }
    for(let id of Object.keys(data)){
        
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries',entries)

}


export const updateEntry = async ({commit},entry) =>{
    const { date,picture,text} = entry
    const dataToSave = {date,picture,text}
    commit('startLoading')
    await journalApi.put(`/entries/${entry.id}.json`,dataToSave)
    commit('updateEntry',{...entry})
}

export const createEntry = async ({ commit },entry) =>{
    const { date,picture,text}= entry
    const dataToSave = {date,picture,text}
    const { data }  = await journalApi.post('/entries.json',dataToSave)
    const newEntry = { ...entry,id:data.name }
    commit('addEntry',newEntry)
    return data.name
}

export const deleteEntry = async ({commit},entryId) =>{
    await journalApi.delete(`/entries/${entryId}.json`)
    commit('deleteEntry',entryId)
}
