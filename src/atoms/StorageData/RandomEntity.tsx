import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadRandoms, addRandom, deleteRandom, selectRandoms, selectIsLoading } from '../../store/random/randomSlice';
import { Random } from '../../models/storage';

const RandomEntity = () => {
  const [newRandomId, setNewRandomId] = useState('');
  const [newRandomType, setNewRandomType] = useState('');
  const dispatch = useAppDispatch();
  const randoms = useAppSelector(selectRandoms);
  const isLoadingRandoms = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingRandoms) {
      dispatch(loadRandoms());
    }
  }, [isLoadingRandoms, dispatch]);

  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'randomid') {
      setNewRandomId(e.target.value);
    } else {
      setNewRandomType(e.target.value);
    }
  }

  const handleSubmit = () => {
    if (!newRandomId) {
      return;
    }
    const random: Random = { id: newRandomId, type: newRandomType };
    dispatch(addRandom(random));
  }

  const handleDelete = (randomId: string) => {
    dispatch(deleteRandom(randomId));
  }

  return (
    <div>
      <h1 className="mb-4 text-6xl">Words</h1>
      <div>
        <label>
          Id: <input id='randomid' type="text" name="randomid" onChange={onChange} />
        </label>
        <label>
          Type: <input id='randomtype' type="text" name="randomtype" onChange={onChange} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        {randoms.map(e => {
          return <div key={e.id}>
            <span>{e.id} </span>
            <span>{e.type}</span>
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
};

export { RandomEntity };
