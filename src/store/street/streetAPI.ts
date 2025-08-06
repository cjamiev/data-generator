import api from "../../api";
import { Street } from "../../models/storage";

export const streetAPI = {
  fetchStreets: (): Promise<{ data: Street[] }> =>
    new Promise<{ data: Street[] }>(resolve =>
      api
        .get('/storage/street/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addStreet: (street: Street): Promise<{ data: Street }> =>
    new Promise<{ data: Street }>(resolve =>
      api
        .post('/storage/street/', JSON.stringify(street))
        .then(() => {
          resolve({ data: street })
        })
    ),
  deleteStreet: (streetId: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/street/${window.btoa(streetId)}`)
        .then(() => {
          resolve({ data: streetId })
        })
    )
}
