import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="h-16 w-full">
      <nav className="ml-2 pb-2 pt-2">
        <ul className="flex flex-row gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/data-generator">Data Generator</Link>
          </li>
          <li>
            <Link to="/password-generator">Password Generator</Link>
          </li>
          <li>
            <Link to="/encode">Encode</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { Header };
