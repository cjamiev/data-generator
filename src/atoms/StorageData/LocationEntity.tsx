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

  const handleSubmit = () => {
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
      <h1 className="mb-4 text-6xl">Locations</h1>
      <div>
        <label>
          Code: <input id='locationcode' type="text" name="locationcode" onChange={onChange} />
        </label>
        <label>
          State: <input id='locationstate' type="text" name="locationstate" onChange={onChange} />
        </label>
        <label>
          Cities: <input id='locationcities' type="text" name="locationcities" onChange={onChange} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        {locations.map(e => {
          return <div key={e.code}>
            <span>{e.code}</span>
            <span>{e.state}</span>
            <span>{e.cities}</span>
            <button onClick={() => handleDelete(e.code)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
};

export { LocationEntity };
