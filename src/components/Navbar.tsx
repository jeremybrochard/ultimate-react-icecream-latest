import { NavLink } from 'react-router-dom';

const Navbar = ({
  links,
}: {
  links: Array<{ title: string; path: string }>;
}) => {
  return (
    <nav>
      {links.map(({ title, path }) => (
        <NavLink key={path} to={path}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};
export default Navbar;
