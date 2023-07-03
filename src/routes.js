import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/regex.js'

const database = new Database

export const routes = [
{
    method: 'GET',
    url: buildRoutePath('/users'),
    handle: (req, res) => {
        const users = database.select('users')
        const result = JSON.stringify(users)

        return res.end(result)
    },
},
{
    method: 'POST',
    url:  buildRoutePath('/users'),
    handle: (req, res) => {
        const {nome, email} = req.body
        const user = {
            nome,
            email,
            "id": randomUUID(),
        }

        database.insert('users', user)

        return res.writeHead(201).end('')
    },
},
{
    method: 'PUT',
    url: buildRoutePath('/users/:id'),
    handle: (req, res) =>{
        const { id } = req.params
        const {nome, email} = req.body
        const editedUser = database.edit('users', id, {
            nome,
            email
        })
        
        if(editedUser) return res.writeHead(204).end('')
        return res.writeHead(404).end('')
    }
},
{
    method: 'DELETE',
    url: buildRoutePath('/users/:id'),
    handle: (req, res) =>{
        const { id } = req.params
        const deleteUser = database.delete('users', id)
        
        if(deleteUser) return res.writeHead(204).end('')
        return res.writeHead(404).end('')
    }
}


]