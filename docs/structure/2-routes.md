### Routes

-----

Routes refer to how the application’s endpoints respond to client requests. These requests are sent to the middlewares (guards, validation, etc) and controllers.

Routes should:
1. Always be versioned.
2. Always be places in the `routes` directory.
3. Almost always use a _guard_ middleware.
4. Almost always wrap the controller with `catchAsync`. This removes the need for try/catch blocks.


Middlewares should always be in this order:
1. Guards,
2. Validation schemas,
3. Any other generic middlewares
4. Controllers