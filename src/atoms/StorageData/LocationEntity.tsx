import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadLocations, addLocation, deleteLocation, selectLocations, selectIsLoading } from '../../store/location/locationSlice';
import { Location } from '../../models/storage';

const LocationEntity = () => {
  const [newLocationCode, setNewLocationCode] = useState('');
  const [newLocationState, setNewLocationState] = useState('');
  const [newLocationCities, setNewLocationCities] = useState('');
  const dispatch = useAppDispatch();
  const locations = useAppSelector(selectLocations);
  const isLoadingLocations = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingLocations) {
      dispatch(loadLocations());
    }
  }, [isLoadingLocations, dispatch]);

  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'locationcode') {
      setNewLocationCode(e.target.value);
    } else if (e.target.name === 'locationstate') {
      setNewLocationState(e.target.value);
    } else {
      setNewLocationCities(e.target.value);
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newLocationCode) {
      return;
    }
    const location: Location = { code: newLocationCode, state: newLocationState, cities: newLocationCities };
    dispatch(addLocation(location));
  }

  const handleDelete = (locationCode: string) => {
    dispatch(deleteLocation(locationCode));
  }

  return (
    <div>
      <h2 className="mb-4 text-4xl">Location: State and Cities</h2>
      <div className='flex'>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  State
                </th>
                <th scope="col" className="px-6 py-3">
                  Cities
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {locations.map(e => {
                return <tr key={e.code} className="bg-white border-b border-gray-700">
                  <td scope="row" className="px-6 py-4">
                    {e.code}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {e.state}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {e.cities}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className='w-fit h-fit border-none' onClick={() => handleDelete(e.code)}>X</button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>

        <div>
          <form className='rounded border border-gray-500 flex flex-col p-4 ml-4'>
            <div className='flex mb-2'>
              <label htmlFor="locationcode" className="block mr-2 text-sm font-medium text-black place-content-center">Code:</label>
              <input type="text" id='locationcode' name="locationcode" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="IL" required />
            </div>
            <div className='flex mb-2'>
              <label htmlFor="locationstate" className="block mr-2 text-sm font-medium text-black place-content-center">State:</label>
              <input type="text" id='locationstate' name="locationstate" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Illinois" required />
            </div>
            <div className='flex mb-2'>
              <label htmlFor="locationcities" className="block mr-2 text-sm font-medium text-black place-content-center">Cities:</label>
              <input type="text" id='locationcities' name="locationcities" onChange={onChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chicago, Springfield, Urbana" required />
            </div>
            <button className='m-auto' onClick={handleSubmit}>Add Location</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LocationEntity };
