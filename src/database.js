import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data => this.#database = JSON.parse(data))
        .catch(() => {
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database)) //writefile só aceita string, por isso transformo em string
    }

    select(table){
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    edit(table, id, data){
        const user = this.findByID(table, id)
        const indexUser = this.#database[table].indexOf(user)
        if(indexUser > -1){
            this.#database[table][indexUser] = {...data, id} 
            this.#persist()
            return user
        }
        return null
    }

    delete(table, id){
        const user = this.findByID(table, id)
        if(user){
            const indexUser = this.#database[table].indexOf(user)
            this.#database[table].splice(indexUser, 1)
            this.#persist()
            return user
        }
        return null
    }

    findByID(table, id){
        const data = this.select(table)
        const selectUser = data.find(user => {
            return user.id === id
        })

        if(selectUser) return selectUser
        return null
    }
}