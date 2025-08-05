import api from "../api";
import { Email } from "../models/random"

export const fetchEmails = (): Promise<{ data: Email[] }> =>
  new Promise<{ data: Email[] }>(resolve =>
    api
      .get('/storage/email/')
      .then((response) => {
        resolve({ data: response.data })
      })
  )

export const addToEmails = (email: Email): Promise<{ data: Email }> =>
  new Promise<{ data: Email }>(resolve =>
    api
      .post('/storage/email/', JSON.stringify(email))
      .then(() => {
        resolve({ data: email })
      })
  )

export const deleteEmailById = (emailId: string): Promise<{ data: string }> =>
  new Promise<{ data: string }>(resolve =>
    api
      .delete(`/storage/email/${emailId}`)
      .then(() => {
        resolve({ data: emailId })
      })
  )
