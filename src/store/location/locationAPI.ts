import api from "../../api";
import { Location } from "../../models/storage";

export const locationAPI = {
  fetchLocations: (): Promise<{ data: Location[] }> =>
    new Promise<{ data: Location[] }>(resolve =>
      api
        .get('/storage/location/')
        .then((response) => {
          resolve({ data: response.data })
        })
    ),
  addLocation: (location: Location): Promise<{ data: Location }> =>
    new Promise<{ data: Location }>(resolve =>
      api
        .post('/storage/location/', JSON.stringify(location))
        .then(() => {
          resolve({ data: location })
        })
    ),
  deleteLocation: (locationCode: string): Promise<{ data: string }> =>
    new Promise<{ data: string }>(resolve =>
      api
        .delete(`/storage/location/${locationCode}`)
        .then(() => {
          resolve({ data: locationCode })
        })
    )
}
