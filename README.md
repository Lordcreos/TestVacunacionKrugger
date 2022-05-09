
## Notes Application

La Aplicación esta diseñada con React , Typescript y Json Server

### Gestión de Ususarios

La aplicación tiene funcionalidades de Login, Registro, Logout, Editar la información del propio perfil.

Los usuarios sólo pueden ver su propio perfil y sus propias tareas (tienen autorización para ello).

Los administradores pueden ver/editar/borrar a todos los usuarios del sitio web. El rol de administrador sólo puede ser otorgado por el administrador.

Los usuarios registrados tienen un estado online/offline (cuando la cuenta de acceso está online y cuando la cuenta de salida está offline)


### Información de vacunación

Los usuarios o el adminstrador crean una fecha de vacunacion la cual queda como pendiente , acontinuacion  el administrador  es el que puede cambiar la vacunacion de pendiente a completada  

la vacunación tiene un nombre numero de dosis y la fecha en la que se realizo 

### Levantar proyecto 
 Para correr el fake api es necesario ejecutar : npm run server 
 ( en el caso de no tener instalado el  paquete como global) usar : npx json-server --watch ./db/db.json --port 3005
 
 Y para correr la aplicación de React ejecutar: npm start