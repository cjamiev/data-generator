import api from "../../api";
import { Email } from "../../models/storage";

export const emailAPI = {
  fetchEmails: (): Promise<{ data: Email[] }> =>
    new Promise<{ data: Email[] }>(resolve =>
      api
        .get('/storage/email/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addEmail: (email: Email): Promise<{ data: Email }> =>
    new Promise<{ data: Email }>(resolve =>
      api
        .post('/storage/email/', JSON.stringify(email))
        .then(() => {
          resolve({ data: email })
        })
    ),
  deleteEmail: (emailId: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/email/${window.btoa(emailId)}`)
        .then(() => {
          resolve({ data: emailId })
        })
    )
}
