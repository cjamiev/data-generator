import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadStreets, addStreet, deleteStreet, selectStreets, selectIsLoading } from '../../store/street/streetSlice';
import { Street } from '../../models/storage';

const StreetEntity = () => {
  const [newStreetId, setNewStreetId] = useState('');
  const dispatch = useAppDispatch();
  const streets = useAppSelector(selectStreets);
  const isLoadingStreets = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingStreets) {
      dispatch(loadStreets());
    }
  }, [isLoadingStreets, dispatch]);

  const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewStreetId(e.target.value);
  }

  const handleSubmit = () => {
    if (!newStreetId) {
      return;
    }
    const street: Street = { id: newStreetId };
    dispatch(addStreet(street));
  }

  const handleDelete = (streetId: string) => {
    dispatch(deleteStreet(streetId));
  }

  return (
    <div>
      <h1 className="mb-4 text-6xl">Streets</h1>
      <div>
        <label>
          New Street: <input id={'new-street'} type="text" name="street" onChange={onChange} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        {streets.map(e => {
          return <div key={e.id}>
            <span></span>{e.id}
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
};

export { StreetEntity };
