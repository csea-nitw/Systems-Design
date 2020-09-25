# Systems-Design Expert

Setup that runs the database examples from the class using Docker containers.

* `initdb.sh`: script with the SQL data from the class.
* Setup: Runs the server and performs a smoke test to verify if the data
* Interactive CLI: Runs a container with a CLI for querying the database
  * With CLI completion...

# Server

* Setup the server container
* Start the client querying all the payments

> *NOTE*: It may take a while until the database inserts the 50 million records... The client container will be retrying...

```
$ docker-compose up
WARNING: Found orphan containers (relational_databases_client_1) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Recreating relational_databases_pg_client_1 ... done
Recreating relational_databases_postgres_1  ... done
Attaching to relational_databases_pg_client_1, relational_databases_postgres_1
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
postgres_1   | The files belonging to this database system will be owned by user "postgres".
postgres_1   | This user must also own the server process.
postgres_1   |
postgres_1   | The database cluster will be initialized with locale "en_US.utf8".
postgres_1   | The default database encoding has accordingly been set to "UTF8".
postgres_1   | The default text search configuration will be set to "english".
postgres_1   |
postgres_1   | Data page checksums are disabled.
postgres_1   |
postgres_1   | fixing permissions on existing directory /var/lib/postgresql/data ... ok
postgres_1   | creating subdirectories ... ok
postgres_1   | selecting dynamic shared memory implementation ... posix
postgres_1   | selecting default max_connections ... 100
postgres_1   | selecting default shared_buffers ... 128MB
postgres_1   | selecting default time zone ... Etc/UTC
postgres_1   | creating configuration files ... ok
postgres_1   | running bootstrap script ... ok
postgres_1   | performing post-bootstrap initialization ... ok
postgres_1   | syncing data to disk ... ok
postgres_1   |
postgres_1   |
postgres_1   | Success. You can now start the database server using:
postgres_1   |
postgres_1   |     pg_ctl -D /var/lib/postgresql/data -l logfile start
postgres_1   |
postgres_1   | initdb: warning: enabling "trust" authentication for local connections
postgres_1   | You can change this by editing pg_hba.conf or using the option -A, or
postgres_1   | --auth-local and --auth-host, the next time you run initdb.
postgres_1   | waiting for server to start....2020-09-26 00:02:10.680 UTC [47] LOG:  starting PostgreSQL 12.4 (Debian 12.4-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
postgres_1   | 2020-09-26 00:02:10.681 UTC [47] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
postgres_1   | 2020-09-26 00:02:10.763 UTC [48] LOG:  database system was shut down at 2020-09-26 00:02:07 UTC
postgres_1   | 2020-09-26 00:02:10.798 UTC [47] LOG:  database system is ready to accept connections
postgres_1   |  done
postgres_1   | server started
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
postgres_1   | CREATE DATABASE
postgres_1   |
postgres_1   |
postgres_1   | /usr/local/bin/docker-entrypoint.sh: sourcing /docker-entrypoint-initdb.d/initdb.sh
postgres_1   | CREATE TABLE
postgres_1   | CREATE TABLE
postgres_1   | CREATE TABLE
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
postgres_1   | INSERT 0 1
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
postgres_1   | INSERT 0 50000000
postgres_1   |
postgres_1   | waiting for server to shut down....2020-09-26 00:08:23.589 UTC [47] LOG:  received fast shutdown request
postgres_1   | 2020-09-26 00:08:23.596 UTC [47] LOG:  aborting any active transactions
postgres_1   | 2020-09-26 00:08:23.599 UTC [47] LOG:  background worker "logical replication launcher" (PID 54) exited with exit code 1
postgres_1   | 2020-09-26 00:08:23.637 UTC [49] LOG:  shutting down
pg_client_1  | wait-for-it.sh: timeout occurred after waiting 15 seconds for postgres:5432
pg_client_1  | psql: error: could not connect to server: could not connect to server: Connection refused
pg_client_1  | 	Is the server running on host "postgres" (172.23.0.3) and accepting
pg_client_1  | 	TCP/IP connections on port 5432?
relational_databases_pg_client_1 exited with code 2
pg_client_1  | wait-for-it.sh: waiting 15 seconds for postgres:5432
postgres_1   | ......2020-09-26 00:08:29.971 UTC [47] LOG:  database system is shut down
postgres_1   |  done
postgres_1   | server stopped
postgres_1   |
postgres_1   | PostgreSQL init process complete; ready for start up.
postgres_1   |
postgres_1   | 2020-09-26 00:08:30.088 UTC [1] LOG:  starting PostgreSQL 12.4 (Debian 12.4-1.pgdg100+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 8.3.0-6) 8.3.0, 64-bit
postgres_1   | 2020-09-26 00:08:30.088 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
postgres_1   | 2020-09-26 00:08:30.088 UTC [1] LOG:  listening on IPv6 address "::", port 5432
postgres_1   | 2020-09-26 00:08:30.091 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
postgres_1   | 2020-09-26 00:08:30.170 UTC [85] LOG:  database system was shut down at 2020-09-26 00:08:28 UTC
postgres_1   | 2020-09-26 00:08:30.193 UTC [87] FATAL:  the database system is starting up
postgres_1   | 2020-09-26 00:08:30.198 UTC [1] LOG:  database system is ready to accept connections
pg_client_1  | wait-for-it.sh: postgres:5432 is available after 3 seconds
pg_client_1  |  customer_name | processed_at | amount
pg_client_1  | ---------------+--------------+--------
pg_client_1  |  clement       | 2019-12-15   |     10
pg_client_1  |  antoine       | 2020-01-01   |    100
pg_client_1  |  clement       | 2020-01-02   |     10
pg_client_1  |  antoine       | 2020-01-02   |    100
pg_client_1  |  antoine       | 2020-01-03   |    100
pg_client_1  |  simon         | 2020-02-05   |   1000
pg_client_1  |  antoine       | 2020-02-01   |    100
pg_client_1  |  clement       | 2020-02-03   |     10
pg_client_1  |  meghan        | 2020-01-12   |     80
pg_client_1  |  meghan        | 2020-01-13   |     70
pg_client_1  |  meghan        | 2020-01-14   |     90
pg_client_1  |  alex          | 2019-12-15   |     10
pg_client_1  |  clement       | 2020-02-01   |     10
pg_client_1  |  marli         | 2020-01-18   |     10
pg_client_1  |  alex          | 2019-12-15   |     10
pg_client_1  |  marli         | 2020-01-25   |     10
pg_client_1  |  marli         | 2020-02-02   |     10
pg_client_1  | (17 rows)
pg_client_1  |
relational_databases_pg_client_1 exited with code 0
relational_databases_pg_client_1 exited with code 0
```

# Interactive CLI

> NOTE: Docker-compose can't get a container attached when running multiple "services". For this reason,
running a separate container through the network.

* Start the client from a container from another terminal
  * It must be on the same network "data"
* Using a `psql` client docker image that makes it easier to execute queries

```
$ docker run -ti --rm --name pgclient --network data morzzz007/pgcli postgresql://rick:picle@postgres:5432/algoexpert-banking
Server: PostgreSQL 12.4 (Debian 12.4-1.pgdg100+1)
Version: 2.2.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com
algoexpert-banking>
```

* At this point you can run the queries used in the class.

# Queries

## Show the number of payments for each user

```sql
SELECT customer_name, count(*)
FROM payments
GROUP BY customer_name
ORDER BY count(*) DESC;
```

* Execution

```
algoexpert-banking> SELECT customer_name, count(*)
 FROM payments
 GROUP BY customer_name
 ORDER BY count(*) DESC;
+-----------------+---------+
| customer_name   | count   |
|-----------------+---------|
| clement         | 4       |
| antoine         | 4       |
| meghan          | 3       |
| marli           | 3       |
| alex            | 2       |
| simon           | 1       |
+-----------------+---------+
```

## Sum the payments amounts for each month/year

```sql
SELECT sum(amount) AS total, extract(year from processed_at) AS year, extract(month from processed_at) AS month
FROM payments
GROUP BY month, year
ORDER BY total DESC;
```

* Execution

```
algoexpert-banking>
SELECT sum(amount) AS total, extract(year from processed_at)::integer AS year, extract(month from processed_at)::integer AS month
FROM payments
GROUP BY month, year
ORDER BY total DESC;
+---------+--------+---------+
| total   | year   | month   |
|---------+--------+---------|
| 1130    | 2020   | 2       |
| 570     | 2020   | 1       |
| 30      | 2019   | 12      |
+---------+--------+---------+
SELECT 3
```

## Sum the payment amounts for each month for each user

```sql
SELECT customer_name, sum(amount) AS total, extract(year from processed_at) AS year, extract(month from processed_at) AS month
FROM payments
GROUP BY customer_name, month, year
ORDER BY customer_name DESC;
```

* Execution

```
algoexpert-banking> SELECT customer_name, sum(amount) AS total, extract(year from processed_at)::integer AS year, extract(month from processed_at)::integer AS month
 FROM payments
 GROUP BY customer_name, month, year
 ORDER BY customer_name DESC;
+-----------------+---------+--------+---------+
| customer_name   | total   | year   | month   |
|-----------------+---------+--------+---------|
| simon           | 1000    | 2020   | 2       |
| meghan          | 240     | 2020   | 1       |
| marli           | 20      | 2020   | 1       |
| marli           | 10      | 2020   | 2       |
| clement         | 10      | 2020   | 1       |
| clement         | 20      | 2020   | 2       |
| clement         | 10      | 2019   | 12      |
| antoine         | 300     | 2020   | 1       |
| antoine         | 100     | 2020   | 2       |
| alex            | 20      | 2019   | 12      |
+-----------------+---------+--------+---------+
SELECT 10
```

## Find the largest single-user payments for each month

```sql
SELECT max(amount), year, month
FROM (
  SELECT customer_name, sum(amount) AS total, extract(year from processed_at)::integer AS year, extract(month from processed_at)::integer AS month
  FROM payments
  GROUP BY customer_name, month, year
) AS monthly_sums
GROUP BY year, month;
```

* Execution

```
algoexpert-banking> SELECT max(sum), year, month
 FROM (
   SELECT customer_name, sum(amount) AS sum, extract(year from processed_at)::integer AS year, extract(month from processed_at)::integer AS month
   FROM payments
   GROUP BY customer_name, month, year
 ) AS monthly_sums
 GROUP BY year, month;
+-------+--------+---------+
| max   | year   | month   |
|-------+--------+---------|
| 20    | 2019   | 12      |
| 1000  | 2020   | 2       |
| 300   | 2020   | 1       |
+-------+--------+---------+
SELECT 3
```

# Find the 10 largest ints

```sql
SELECT * from large_table LIMIT 10;
```

* Execution

```
algoexpert-banking> SELECT * from large_table LIMIT 10;
+--------------+
| random_int   |
|--------------|
| 84195675     |
| 99950739     |
| 74419398     |
| 38673242     |
| 98752989     |
| 51381285     |
| 52823262     |
| 86095641     |
| 76775770     |
| 87470310     |
+--------------+
SELECT 10
Time: 0.019s
```

# Transactions

* Transfer 100 from Clement to Antoine

```sql
BEGIN TRANSACTION;
UPDATE balances SET balance = balance - 100 WHERE username = 'clement';
UPDATE balances SET balance = balance + 100 WHERE username = 'antoine';
COMMIT;
```

* Execution

```
algoexpert-banking> BEGIN TRANSACTION;
 UPDATE balances SET balance = balance - 100 WHERE username = 'clement';
 UPDATE balances SET balance = balance + 100 WHERE username = 'antoine';
 COMMIT;
BEGIN
UPDATE 1
UPDATE 0
COMMIT
Time: 0.005s

algoexpert-banking> select * from balances
+------------+-----------+
| username   | balance   |
|------------+-----------|
| antonie    | 0         |
| clement    | 900       |
+------------+-----------+
SELECT 2
```

* Starting 2 transactions in separate windows can exercise the isolation capabilities of ACID
* Transactions are isolated and there's a guarantee that one acquires the lock while the other blocks until the first commits

## Indexes

* The list of all random numbers is very slow
  * I had to cancel the query after 19s

```sql
algoexpert-banking> select * from large_table;

^Ccanceling statement due to user request

Time: 19.950s (19 seconds), executed in: 19.944s (19 seconds)
```

* Creating the index is as follows

```sql
CREATE INDEX large_table_random_int_idx ON large_table(random_int);
```

* Executing the query now is faster because the way the data is stored

```
algoexpert-banking> select * from large_table LIMIT 10;
+--------------+
| random_int   |
|--------------|
| 84195675     |
| 99950739     |
| 74419398     |
| 38673242     |
| 98752989     |
| 51381285     |
| 52823262     |
| 86095641     |
| 76775770     |
| 87470310     |
+--------------+
SELECT 10
Time: 0.014s
```
