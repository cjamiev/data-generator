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