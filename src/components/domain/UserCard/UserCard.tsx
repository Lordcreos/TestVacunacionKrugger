import React from 'react';
import { Card } from 'react-bootstrap';
import { userModel } from 'types/userModel';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

type Props = {
  user: userModel;
};

function UserCard({ user: { name, ci, picture, id, isActive } }: Props) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" className={styles.cardImage} src={`${picture}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Cedula: {ci} 
          <br />
          {isActive ? (
            <span className={styles.active}>Conectado</span>
          ) : (
            <span className={styles.disable}>No conectado</span>
          )}
        </Card.Text>
        <Link to={`/users/${id}`} className="btn btn-primary">
          Perfil Usuario
        </Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
