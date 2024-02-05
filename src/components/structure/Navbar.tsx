import { NavLink } from 'react-router-dom';

const Navbar = ({
  links,
}: {
  links: Array<{
    title: string;
    path: string;
    state?: { focus: boolean };
  }>;
}) => {
  return (
    <nav>
      {links.map(({ title, path, state }) => (
        <NavLink key={path} to={path} state={state}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};
export default Navbar;
