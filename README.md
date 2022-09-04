# docker-practice

### Task description

- Write a small nodejs app that uses a mongo database for some CRUD operations.
  - The homepage (/) will show a list of users available in your database in a tabular format.
  - The homepage will also have a form through which we can write some information (First Name, Last Name, Email Address, Mobile Number) about the user in the database.
  - In the table showing the information of the users, there will be two buttons for each row.
    - The “Edit” button will allow us to edit the existing information of the user.
    - The “Delete” button can delete the user from the database.
- Once the nodejs application is ready and functional, write a Dockerfile for building the image for the application.
- After that, write a docker-compose file which will allow us to use the application.

### Notes

To access host machine's ports from container, add the followingin docker-compose.yml:
```yml
    extra_hosts:
      - "host.docker.internal:host-gateway"
      # Access host machine's localhost using host.docker.internal
```

SERVER_HOST has to be 0.0.0.0 to listen to requests from outside container.

Use `alias compose-up="docker-compose pull && docker-compose up -d --build --remove-orphans"`. Without pull, latest tagged image may not actually be latest and without --build, compose will use your previous built image even if your Dockerfile has changed.

At each step, docker build doesn't use cache if any of the workdir files or previous steps have changed since last build.

Docker logs are line-buffered. So if a command prints without newline, you may not be able to see it in docker logs. For same reason, can't see progress bars of `pip install`.

https://docs.docker.com/compose/compose-file/#extension && https://www.educative.io/blog/advanced-yaml-syntax-cheatsheet
