import api from "../../api";
import { Url } from "../../models/storage";

export const urlAPI = {
  fetchUrls: (): Promise<{ data: Url[] }> =>
    new Promise<{ data: Url[] }>(resolve =>
      api
        .get('/storage/url/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addUrl: (url: Url): Promise<{ data: Url }> =>
    new Promise<{ data: Url }>(resolve =>
      api
        .post('/storage/url/', JSON.stringify(url))
        .then(() => {
          resolve({ data: url })
        })
    ),
  deleteUrl: (id: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/url/${window.btoa(id)}`)
        .then(() => {
          resolve({ data: id })
        })
    )
}
