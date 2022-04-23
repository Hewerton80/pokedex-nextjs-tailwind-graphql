import axios from 'axios'

export const apiBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API || 'http://localhost:3001',
})
