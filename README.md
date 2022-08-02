
# APP PARA COMPARTIR ENLACES 
 -- usa este icono cuando tengas la tarea realizada ✅
 -- usa este icono cuando tengas la tarea incompleta ❗️
 -- usa este icono para que quede asignada la tarea a un miembro del equipo 🧔🏻G    👨🏻‍🦱L   👱🏻‍♀️Y

## DESCRIPCIÓN:
Implementar una API que permita a los usuarios registrarse y compartir enlaces web que consideren interesantes. 
Otros usuarios podrán votarlos si les gustan.

## USUARIOS ANÓNIMOS:
Los usuarios anónimos sólo podrán registrarse y acceder.

## USUARIOS REGISTRADOS:
● Ver los enlaces publicados en el día de hoy y en días anteriores
● Publicar nuevo enlace
○ URL
○ Título
○ Descripción
● Borrar un enlace publicado por el usuario
● Votar un enlace de otro usuario.
● Opcional:
○ Editar perfil de usuario (Nombre, Email, Biografía, Foto, …)

## TITULO
-- Crear un título a nuestra Api✅
SHARE LINK

## BASE DE DATOS.
-- Diseñar modelo relacional de la BD de nuestra api ✅

## ENDPOINTS:

### USERS:

- POST - '/users' - Creación de usuario sin activar - obligatorio email y password. ✅

- GET - '/users/validate/:registrationCode' - Validaremos al usuario que se ha registrado. -Envio de mail para verificació de mail.✅

- POST - '/users/login' - Comprobar que el usuario existe -mail y password obligatoria - Devolverá el token.✅

- GET - '/users/:id' -Devolvemos información del usuario teniendo en cuenta si es el propio usuario o admin se le dará más información y si no lo es se le dará menos información. - Token obligatorio.

- PUT - '/users/:id/password' - Que el usuario pueda editar su contraseña - Sólo el usuario propio no el admin -Token obligatorio.

- DELETE - '/users/:id' - Sólo el admin podrá realizar un eliminación de usuario y el usuario solo podra anularse

### LINKS:

- GET - '/links' - Ver enlaces publicados por orden de publicación de más actual a anterior.

- GET - '/links/:id' - Ver información de una publicación específica.

- POST - '/links/:id' - Compartir un enlace -URL -Título -Descrpción --Token obligatorio. 👨🏻‍🦱L 

- DELETE - '/links/:id' -Borrar un enlace creado por el mismo usuario, tambien lo podrá elimina el admin si así lo require --Token obligatorio.

- POST - '/links/:id/votes' -Votar publicaiones de otros enlaces --Solo se podra votar un vez --Token obligatorio

### EXTRA:
- DELETE - /links/:id/votes -Token obligatorio
- PUT - /links/:id  -- Editar título, o descrpcion del enlace. -Token obligatorio.
- PUT - '/users/:id' -- Editar perfil del usuario (Nombre, Email, Biografía, Foto, …) Token obligatorio

















