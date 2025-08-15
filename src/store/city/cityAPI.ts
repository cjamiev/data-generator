import api from "../../api";
import { City } from "../../models/storage";

export const cityAPI = {
  fetchCities: (): Promise<{ data: City[] }> =>
    new Promise<{ data: City[] }>(resolve =>
      api
        .get('/storage/city/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addCity: (city: City): Promise<{ data: City }> =>
    new Promise<{ data: City }>(resolve =>
      api
        .post('/storage/city/', JSON.stringify(city))
        .then(() => {
          resolve({ data: city })
        })
    ),
  deleteCity: (id: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/city/${id}`)
        .then(() => {
          resolve({ data: id })
        })
    )
}
