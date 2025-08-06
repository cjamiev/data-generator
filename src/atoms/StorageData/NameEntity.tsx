import { SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadNames, addName, deleteName, selectNames, selectIsLoading } from '../../store/name/nameSlice';
import { Name } from '../../models/storage';

const genderTypes = [
  {
    label: 'Male',
    value: 'm'
  },
  {
    label: 'Female',
    value: 'f'
  },
  {
    label: 'Other',
    value: 'o'
  },
]

const NameEntity = () => {
  const [newNameId, setNewNameId] = useState('');
  const [isFirstName, setIsFirstName] = useState(true);
  const [isLastName, setIsLastName] = useState(false);
  const [newNameGender, setNewNameGender] = useState('m');
  const dispatch = useAppDispatch();
  const names = useAppSelector(selectNames);
  const isLoadingNames = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (isLoadingNames) {
      dispatch(loadNames());
    }
  }, [isLoadingNames, dispatch]);

  const onChange = (e: { target: { value: SetStateAction<string>; name: SetStateAction<string>; }; }) => {
    if (e.target.name === 'nameid') {
      setNewNameId(e.target.value);
    } else {
      setNewNameGender(e.target.value);
    }
  }

  const handleSubmit = () => {
    if (!newNameId) {
      return;
    }
    const name: Name = { id: newNameId, is_first_name: isFirstName, is_last_name: isLastName, gender: newNameGender };
    dispatch(addName(name));
  }

  const handleDelete = (nameId: string) => {
    dispatch(deleteName(nameId));
  }

  return (
    <div>
      <h1 className="mb-4 text-6xl">Names</h1>
      <div>
        <label>
          Name: <input id='nameid' type="text" name="nameid" onChange={onChange} />
        </label>
        <label>
          Is First Name?: <input type="checkbox" checked={isFirstName} onClick={() => { setIsFirstName(!isFirstName) }} />
        </label>
        <label>
          Is Last Name?: <input type="checkbox" checked={isLastName} onClick={() => { setIsLastName(!isLastName) }} />
        </label>
        <label className="form-label">
          Gender:
          <select className="form-input" name="gender" value={newNameGender} onChange={onChange}>
            {genderTypes
              .map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
          </select>
        </label>
        <button onClick={handleSubmit}>Submit</button>
        {names.map(e => {
          return <div key={e.id}>
            <span>Name: {e.id}|</span>
            <span>Is First Name?: {e.is_first_name ? 'Yes' : 'No'}|</span>
            <span>Is Last Name?: {e.is_last_name ? 'Yes' : 'No'}|</span>
            <span>Gender: {genderTypes.find(g => g.value === e.gender)?.label}</span>
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
};

export { NameEntity };
