###Controllers

----

Controllers are responsible for handling incoming requests. Logic should be 
deferred to helpers and services if possible. 

Controllers should:
1. Always be created in the `controllers` directory.
2. Have the same naming convention as the file. For example, if the filename is `controller/auth.js` then the object should be named `authController`
3. Be one object. This object should be the default export.
4. 