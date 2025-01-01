import { useNavigate, useLocation } from 'react-router-dom';
import { RoutesUrl, RoutesTitle } from '../types/routes';

const Urls = Object.keys(RoutesUrl);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-16 w-full">
      <nav className="ml-2 pb-2 pt-2">
        <ul className="flex flex-row gap-2">
          {Urls.map(link => {
            const linkUrl = RoutesUrl[link as keyof typeof RoutesUrl];
            const linkTitle = RoutesTitle[link as keyof typeof RoutesTitle];
            const isActive = location.pathname === linkUrl;

            return (<li key={link}>
              <a className={`cursor-pointer p-4 ${isActive ? 'font-bold' : ''}`} onClick={() => navigate(linkUrl)}>{linkTitle}</a>
            </li>)
          })}
        </ul>
      </nav>
    </div>
  );
};

export { Header };
