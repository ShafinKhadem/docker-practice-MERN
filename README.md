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

Most frontend frameworks won't pass all environment variables to browser runtime. Only variables with specific name format (e.g. prefix by `REACT_APP_` for react) will be passed.

`COPY ./src .` copies the contents of `./src` (not the folder itself) to workdir. In most cases, you want to do `COPY ./src ./src`.

To access host machine's ports from container, add the following in docker-compose.yml:
```yml
    extra_hosts:
      - "host.docker.internal:host-gateway"
      # Access host machine's localhost using host.docker.internal
```

SERVER_HOST has to be 0.0.0.0 to listen to requests from outside container.

Docker logs are line-buffered. So if a command prints without newline, you may not be able to see it in docker logs. For same reason, can't see progress bars of `pip install`.

From inside a container process, docker's stdout can be accessed by `/proc/1/fd/1` and stderr can be accessed by `/proc/1/fd/2`. So, for seeing output of a cron, use `* * * * * printf "[$(date -Iseconds)]\t$(curl -s polling:8090)\n" > /proc/1/fd/1 2>/proc/1/fd/2`. **`%` has to be escaped in crontab`.**

You can create overlapping local to remote mounts: https://stackoverflow.com/questions/50238503/overlapping-bind-mounts-and-permissions-in-docker-on-linux

To prevent docker with background processes from shutting down, add `CMD tail -f /dev/null`.

Use `alias compose-up="docker-compose pull && docker-compose up -d --build --remove-orphans"`. Without pull, latest tagged image may not actually be latest and without --build, compose will use your previous built image even if your Dockerfile has changed.

Also use `alias docker-ps='docker ps --format "table {{.Names}}\t{{.RunningFor}}\t{{.Status}}\t{{.Ports}}"'`

At each step, docker build doesn't use cache if any of the workdir files or previous steps have changed since last build. Use [RUN --mount=type=cache,target=/root/.cache](https://docs.docker.com/engine/reference/builder/#run---mounttypecache) for dependency installation commands to persist dependency caches across builds.

https://docs.docker.com/compose/compose-file/#extension && https://www.educative.io/blog/advanced-yaml-syntax-cheatsheet

If you just need to change the entrypoint from an image, directly do it in docker-compose using `command: ` instead of creating a separate Dockerfile.
