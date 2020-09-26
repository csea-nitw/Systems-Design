# Specialized Storage

* Different storage systems for different purposes
* Blob-store, GraphDB, Spatial

# GraphDB

* Neo4J is a database that uses Graphs to store data
* The data model is a graph and the queries are usually traversing the graph

## Example

### Start the server

* Using docker-compose up to start the server.

```
$ docker-compose up
Creating specialized_storage_neo4j_1 ... done
Attaching to specialized_storage_neo4j_1
neo4j_1  | 2020-09-27 16:26:09:175+0000 INFO  Wrapper: Waiting until neo4j stats at :7474 ...
neo4j_1  | Directories in use:
neo4j_1  |   home:         /var/lib/neo4j
neo4j_1  |   config:       /var/lib/neo4j/conf
neo4j_1  |   logs:         /logs
neo4j_1  |   plugins:      /var/lib/neo4j/plugins
neo4j_1  |   import:       /var/lib/neo4j/import
neo4j_1  |   data:         /var/lib/neo4j/data
neo4j_1  |   certificates: /var/lib/neo4j/certificates
neo4j_1  |   run:          /var/lib/neo4j/run
neo4j_1  | Starting Neo4j.
neo4j_1  | 2020-09-27 16:26:10.210+0000 INFO  Starting...
neo4j_1  | 2020-09-27 16:26:11.874+0000 INFO  ======== Neo4j 4.1.2 ========
neo4j_1  | 2020-09-27 16:26:13.161+0000 INFO  Initializing system graph model for component 'security-users' with version -1 and status UNINITIALIZED
neo4j_1  | 2020-09-27 16:26:13.166+0000 INFO  Setting up initial user from defaults: neo4j
neo4j_1  | 2020-09-27 16:26:13.166+0000 INFO  Creating new user 'neo4j' (passwordChangeRequired=true, suspended=false)
neo4j_1  | 2020-09-27 16:26:13.173+0000 INFO  Setting version for 'security-users' to 2
neo4j_1  | 2020-09-27 16:26:13.176+0000 INFO  After initialization of system graph model component 'security-users' have version 2 and status CURRENT
neo4j_1  | 2020-09-27 16:26:13.179+0000 INFO  Performing postInitialization step for component 'security-users' with version 2 and status CURRENT
neo4j_1  | 2020-09-27 16:26:13.330+0000 INFO  Bolt enabled on 0.0.0.0:7687.
neo4j_1  | 2020-09-27 16:26:14.199+0000 INFO  Remote interface available at http://localhost:7474/
neo4j_1  | 2020-09-27 16:26:14.199+0000 INFO  Started.
neo4j_1  | 2020-09-27 16:26:14:327+0000 INFO  Wrapper: Deleting all relations
neo4j_1  | 2020-09-27 16:26:17:065+0000 INFO  Wrapper: Wrapper: Loading cyphers from '/cyphers'
neo4j_1  | 2020-09-27 16:26:17:067+0000 INFO  Wrapper: Running cypher /cyphers/interviews.cql
neo4j_1  | 2020-09-27 16:26:18:410+0000 INFO  Wrapper: Finished loading all cyphers from '/cyphers'
neo4j_1  | 2020-09-27 16:26:19:471+0000 INFO  Wrapper: Wrapper: Changes count 17
neo4j_1  | /docker-entrypoint.sh neo4j
```

### Cyphers

1. Make sure the cyphers are loaded by going to http://localhost:7474/
2. Click on the left-most corner Database icon
3. You can see the 17 records created

![neo4j-cyphers-loaded](https://user-images.githubusercontent.com/131457/94336227-d6703f80-ffb7-11ea-891b-fc42c7750c28.png)

### Query the data

* Copy and paste the query below and press the button '|>'

```cql
MATCH (interviewer:Interviewer)-[:INTERVIEWED {score:'failed'}]->(:Candidate {name: 'Clement'})
WHERE (interviewer)-[:APPLIED {status: 'rejected'}]->(:Company {name: 'Facebook'})
RETURN interviewer.name;
```

## Clean Up data

* Just execute `docker-compose rm` to delete all to restart if needed
