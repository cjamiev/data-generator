import api from "../../api";
import { Random } from "../../models/storage";

export const randomAPI = {
  fetchRandoms: (): Promise<{ data: Random[] }> =>
    new Promise<{ data: Random[] }>(resolve =>
      api
        .get('/storage/random/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addRandom: (random: Random): Promise<{ data: Random }> =>
    new Promise<{ data: Random }>(resolve =>
      api
        .post('/storage/random/', JSON.stringify(random))
        .then(() => {
          resolve({ data: random })
        })
    ),
  deleteRandom: (randomId: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/random/${randomId}`)
        .then(() => {
          resolve({ data: randomId })
        })
    )
}
