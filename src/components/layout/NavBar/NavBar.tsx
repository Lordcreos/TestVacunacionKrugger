import React, { useContext } from 'react';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from 'components/context/authContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>Vacunación Krugger</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Vacunación
          </Link>
          {user.isAdmin && (
            <Link className="nav-link" to="/users">
              Usuarios
            </Link>
          )}
        </Nav>
        <Form inline>
          <Nav className="nav-link" style={{ color: '#fff' }}>

            <Button variant="outline-light">
              <Link style={{ textDecoration: 'none',color: '#fff'}}  to={`/users/${user.id}`}>
              {user?.email} ({user?.isAdmin ? 'Admin' : 'User'})
            </Link> </Button>
          </Nav>
          <Button variant="outline-light" onClick={() => logout(user)}>
            Logout
          </Button>
        </Form>
      </Navbar>
    </>
  );
}

export default NavBar;
 