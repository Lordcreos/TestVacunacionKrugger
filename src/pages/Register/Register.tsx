import React, { useState, useContext } from 'react';
import {
  Container,
  Col,
  Row,
  FormGroup,
  Button,
  FormLabel, 
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { AuthContext } from 'components/context/authContext';
import styles from './Register.module.css';

function Register() {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [ciError, setCiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, registerError } = useContext(AuthContext);


  return (
    <Container>
      <Row className={styles.registerWrapper}>
        <Col lg={4}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              name: '',
              lastname : '',
              ci: 0,
              picture: 'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png',
            }}
            onSubmit={(values) => {
              const action = async () => {
                setLoading(true);
                
                if (values.password !== values.confirmPassword ) {
                  setPasswordError('Los passwords no coinciden');
                } 
                
               else if (values.ci.toString().length !== 10) {
                  setCiError('La cedula debe tener 10 digitos');
                  console.log(values.ci.toString().length)
                  
                } else {
                  register({
                    id: 0, 
                    email: values.email,
                    name: values.name,
                    lastname: values.lastname,
                    password: values.password,
                    ci: values.ci,
                    picture: values.picture,
                    isAdmin: false,
                    isActive: false,
                  });
                  setPasswordError(null);
                  setCiError(null);
                }
                setLoading(false);
              };
              action();
            }}
          >
            
            {({ handleSubmit }) => (
              <form name="register" onSubmit={handleSubmit}>
                <h3>Registrar Cuenta</h3>
                <FormGroup>
                  <FormLabel htmlFor="email">email</FormLabel>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Ingresa Email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="name">Nombre</FormLabel>
                  <Field 
                    pattern="[a-zA-Z\s]+" 
                    title="No debe contener numeros ni caracteres especiales ni espacios"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Ingresa Nombre"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="lastname">Apellido</FormLabel>
                  <Field
                    pattern="[a-zA-Z\s]+" 
                    title="No debe contener numeros ni caracteres especiales ni espacios"
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Ingresa Apellido"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel  htmlFor="ci">Cedula</FormLabel>
                  <Field
                    type="text" 
                    maxlength="10"
                    pattern="\d{10}" 
                    title="Por favor ingrese 10 digitos "
                    name="ci"
                    className="form-control"
                    placeholder="Ingresar Cedula"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Ingresa Contraseña"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Ingresa Contraseña nuevamente"
                    required
                  />
                </FormGroup>
                <Button type="submit" variant="primary" block>
                  {loading ? 'Por favor espere' : 'registrarse'}
                </Button>
                <p className="text-right">
                  <Link to="/login">Log In</Link>
                </p>
                {passwordError && (
                  <Row className="justify-content-center">
                    <Alert variant="danger">{passwordError}</Alert>
                  </Row>
                )}
                {registerError && (
                  <Row className="justify-content-center">
                    <Alert variant="danger">{registerError}</Alert>
                  </Row>
                )}
                 {ciError && (
                  <Row className="justify-content-center">
                    <Alert variant="danger">{ciError}</Alert>
                  </Row>
                )}
              </form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
