import api from "../../api";
import { Name } from "../../models/storage";

export const nameAPI = {
  fetchNames: (): Promise<{ data: Name[] }> =>
    new Promise<{ data: Name[] }>(resolve =>
      api
        .get('/storage/name/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addName: (name: Name): Promise<{ data: Name }> =>
    new Promise<{ data: Name }>(resolve =>
      api
        .post('/storage/name/', JSON.stringify(name))
        .then(() => {
          resolve({ data: name })
        })
    ),
  deleteName: (nameId: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/name/${nameId}`)
        .then(() => {
          resolve({ data: nameId })
        })
    )
}
