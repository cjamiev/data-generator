import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='h-16 w-full'>
      <nav className='ml-2 pt-2 pb-2'>
        <ul className='flex flex-row gap-2'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/generator">Generator</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { Header };
