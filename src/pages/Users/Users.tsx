import React, { useState, useEffect, useContext } from 'react';
import { getUsers } from 'components/api/users';
import Layout from 'components/layout/Layout';
import { userModel } from 'types/userModel';
import UserCard from 'components/domain/UserCard';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AuthContext } from 'components/context/authContext';
import AddUserModal from 'components/domain/AddUserModal/AddUserModal';

function Users() {
  const [users, setUsers] = useState<userModel[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const res = await getUsers();
    setUsers(res);
    setLoading(false);
  };
 
  useEffect(() => {
    loadUsers();
  }, []);

  const registerUser = (user: userModel) => {
    setUsers([user, ...users]);
  };


  const { user } = useContext(AuthContext);
  if (!user?.isAdmin) {
    return (
      <Layout>
        <Row className="justify-content-center">
          Acceso restringido solo a Admins
        </Row>
      </Layout>
    );
  }
  return (
    <>
      <Layout>
        {loading && (
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        )}
        {users && users.length > 0 && (
          <>
            <h2 style={{ margin: '1.5rem 0' }}>Registro: <AddUserModal onAdd={registerUser}/></h2>
            
            <h6>
              Admins: {users.filter((x) => x.isAdmin === true).length} {'  '}
              Usuarios: {users.filter((x) => x.isAdmin === false).length} {'  '}
              Activos: {users.filter((x) => x.isActive === true).length}
            </h6>
            <Row>
              {users.map((data) => (
                <Col lg={3} key={data.id}>
                  <UserCard user={data} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Layout>
    </>
  );
}

export default Users;
