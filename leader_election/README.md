# Leader Election

* Algorithms for consensus is Proxos and Raft
* `Zookeeper`, used by Uber’s services for leader election
* `ETCD`: Key-value store
    * Always guaranteed to be returned the correct value in the cluster
    * It’s strongly-consistent and being high-availability
    * Implements a consensus algorithm Raft
    * Have multiple servers communicating with ETCD having a special key=value pair telling who the leader is
        * leader=IP address
        * leader=name
    * ETCD guarantees the high availability and strong consistency so knowing the name of the leader is guaranteed

# Etcd - Start Server

* Run a server in the terminal.

```
$ docker-compose -f docker-compose-etcd.yaml up
WARNING: Found orphan containers (leader_election_server1_1, leader_election_server3_1, leader_election_server2_1) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans flag to clean it up.
Creating leader_election_etcd_server_1 ... done
Attaching to leader_election_etcd_server_1
etcd_server_1  | [WARNING] Deprecated '--debug' flag is set to true (use '--log-level=debug' instead
etcd_server_1  | [WARNING] Deprecated '--debug' flag is set to true with inconsistent '--log-level=info' flag
etcd_server_1  | [WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
etcd_server_1  | 2020-09-28 06:01:50.649904 I | etcdmain: etcd Version: 3.4.13
etcd_server_1  | 2020-09-28 06:01:50.649961 I | etcdmain: Git SHA: ae9734ed2
etcd_server_1  | 2020-09-28 06:01:50.649970 I | etcdmain: Go Version: go1.12.17
etcd_server_1  | 2020-09-28 06:01:50.649975 I | etcdmain: Go OS/Arch: linux/amd64
etcd_server_1  | 2020-09-28 06:01:50.649979 I | etcdmain: setting maximum number of CPUs to 10, total number of available CPUs is 10
etcd_server_1  | 2020-09-28 06:01:50.649987 W | etcdmain: no data-dir provided, using default data-dir ./default.etcd
etcd_server_1  | [WARNING] Deprecated '--debug' flag is set to true (use '--log-level=debug' instead
etcd_server_1  | [WARNING] Deprecated '--debug' flag is set to true with inconsistent '--log-level=info' flag
etcd_server_1  | [WARNING] Deprecated '--logger=capnslog' flag is set; use '--logger=zap' flag instead
etcd_server_1  | 2020-09-28 06:01:50.650660 I | embed: name = default
etcd_server_1  | 2020-09-28 06:01:50.650685 I | embed: data dir = default.etcd
etcd_server_1  | 2020-09-28 06:01:50.650691 I | embed: member dir = default.etcd/member
etcd_server_1  | 2020-09-28 06:01:50.650693 I | embed: heartbeat = 100ms
etcd_server_1  | 2020-09-28 06:01:50.650696 I | embed: election = 1000ms
etcd_server_1  | 2020-09-28 06:01:50.650698 I | embed: snapshot count = 100000
etcd_server_1  | 2020-09-28 06:01:50.650705 I | embed: advertise client URLs = http://etcd_server:2378
etcd_server_1  | 2020-09-28 06:01:50.655732 I | etcdserver: starting member 8e9e05c52164694d in cluster cdf818194e3a8c32
etcd_server_1  | raft2020/09/28 06:01:50 INFO: 8e9e05c52164694d switched to configuration voters=()
etcd_server_1  | raft2020/09/28 06:01:50 INFO: 8e9e05c52164694d became follower at term 0
etcd_server_1  | raft2020/09/28 06:01:50 INFO: newRaft 8e9e05c52164694d [peers: [], term: 0, commit: 0, applied: 0, lastindex: 0, lastterm: 0]
etcd_server_1  | raft2020/09/28 06:01:50 INFO: 8e9e05c52164694d became follower at term 1
etcd_server_1  | raft2020/09/28 06:01:50 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
etcd_server_1  | 2020-09-28 06:01:50.658251 W | auth: simple token is not cryptographically signed
etcd_server_1  | 2020-09-28 06:01:50.662247 I | etcdserver: starting server... [version: 3.4.13, cluster version: to_be_decided]
etcd_server_1  | 2020-09-28 06:01:50.662389 I | etcdserver: 8e9e05c52164694d as single-node; fast-forwarding 9 ticks (election ticks 10)
etcd_server_1  | raft2020/09/28 06:01:50 INFO: 8e9e05c52164694d switched to configuration voters=(10276657743932975437)
etcd_server_1  | 2020-09-28 06:01:50.662861 I | etcdserver/membership: added member 8e9e05c52164694d [http://localhost:2380] to cluster cdf818194e3a8c32
etcd_server_1  | 2020-09-28 06:01:50.664042 I | embed: listening for peers on 127.0.0.1:2380
etcd_server_1  | raft2020/09/28 06:01:51 INFO: 8e9e05c52164694d is starting a new election at term 1
etcd_server_1  | raft2020/09/28 06:01:51 INFO: 8e9e05c52164694d became candidate at term 2
etcd_server_1  | raft2020/09/28 06:01:51 INFO: 8e9e05c52164694d received MsgVoteResp from 8e9e05c52164694d at term 2
etcd_server_1  | raft2020/09/28 06:01:51 INFO: 8e9e05c52164694d became leader at term 2
etcd_server_1  | raft2020/09/28 06:01:51 INFO: raft.node: 8e9e05c52164694d elected leader 8e9e05c52164694d at term 2
etcd_server_1  | 2020-09-28 06:01:51.557934 I | etcdserver: published {Name:default ClientURLs:[http://etcd_server:2378]} to cluster cdf818194e3a8c32
etcd_server_1  | 2020-09-28 06:01:51.557964 I | embed: ready to serve client requests
etcd_server_1  | 2020-09-28 06:01:51.558104 I | etcdserver: setting up the initial cluster version to 3.4
etcd_server_1  | 2020-09-28 06:01:51.558361 N | etcdserver/membership: set the initial cluster version to 3.4
etcd_server_1  | 2020-09-28 06:01:51.558417 I | etcdserver/api: enabled capabilities for version 3.4
etcd_server_1  | INFO: 2020/09/28 06:01:51 parsed scheme: ""
etcd_server_1  | INFO: 2020/09/28 06:01:51 scheme "" not registered, fallback to default scheme
etcd_server_1  | INFO: 2020/09/28 06:01:51 ccResolverWrapper: sending update to cc: {[{0.0.0.0:2378  <nil> 0 <nil>}] <nil> <nil>}
etcd_server_1  | INFO: 2020/09/28 06:01:51 ClientConn switching balancer to "pick_first"
etcd_server_1  | 2020-09-28 06:01:51.558732 N | embed: serving insecure client requests on [::]:2378, this is strongly discouraged!
```

# Start Implementation Servers

* In another terminal, start the servers

```
$ docker-compose up
WARNING: Found orphan containers (leader_election_etcd_server_1) for this project. If you removed or renamed this service in your compose file, you can run this command with the --remove-orphans fl.
Recreating leader_election_server1_1 ... done
Recreating leader_election_server3_1 ... done
Recreating leader_election_server2_1 ... done
Attaching to leader_election_server2_1, leader_election_server1_1, leader_election_server3_1
server2_1  | wait-for-it.sh: waiting 15 seconds for etcd_server:2378
server2_1  | wait-for-it.sh: etcd_server:2378 is available after 0 seconds
server1_1  | wait-for-it.sh: waiting 15 seconds for etcd_server:2378
server1_1  | wait-for-it.sh: etcd_server:2378 is available after 0 seconds
server3_1  | wait-for-it.sh: waiting 15 seconds for etcd_server:2378
server3_1  | wait-for-it.sh: etcd_server:2378 is available after 0 seconds
server2_1  | Starting the server 'server2'
server2_1  | Connecting to etcd at 'etcd_server:2378'
server2_1  | New leader election happening.
server1_1  | Starting the server 'server1'
server1_1  | Connecting to etcd at 'etcd_server:2378'
server2_1  | I am the leader.
server2_1  | Refreshing lease; still the leader.
server1_1  | New leader election happening.
server1_1  | I am a follower.
server3_1  | Starting the server 'server3'
server3_1  | Connecting to etcd at 'etcd_server:2378'
server3_1  | New leader election happening.
server3_1  | I am a follower.
server2_1  | Refreshing lease; still the leader.
server2_1  | Refreshing lease; still the leader.
server2_1  | Refreshing lease; still the leader.
server2_1  | Refreshing lease; still the leader.
server2_1  | Refreshing lease; still the leader.
....
```

* Now, execute `docker ps` and kill the leader...

```
$ docker ps
CONTAINER ID        IMAGE                                           COMMAND                  CREATED             STATUS              PORTS                                   NAMES
6268eaad6079        marcellodesales/systemsexpert-leader-election   "/wait-for-it.sh etc…"   22 seconds ago      Up 21 seconds                                               leader_election_server1_1
f8dfcf6af26f        marcellodesales/systemsexpert-leader-election   "/wait-for-it.sh etc…"   22 seconds ago      Up 21 seconds                                               leader_election_server2_1
d9b041ad8283        marcellodesales/systemsexpert-leader-election   "/wait-for-it.sh etc…"   22 seconds ago      Up 21 seconds                                               leader_election_server3_1
28b3621ca69a        quay.io/coreos/etcd:v3.4.13                     "etcd --initial-clus…"   9 minutes ago       Up 9 minutes        0.0.0.0:2378->2378/tcp, 2379-2380/tcp   leader_election_etcd_server_1

$ docker kill f8dfcf6af26f
f8dfcf6af26f
```

* Now the terminal showing the election updates

```
server2_1  | Refreshing lease; still the leader.
server2_1  | Refreshing lease; still the leader.
leader_election_server2_1 exited with code 137
server1_1  | LEADERSHIP CHANGE REQUIRED
server3_1  | LEADERSHIP CHANGE REQUIRED
server1_1  | new election
server1_1  | New leader election happening.
server1_1  | I am the leader.
server1_1  | Refreshing lease; still the leader.
server3_1  | new election
server3_1  | New leader election happening.
server3_1  | I am a follower.
server1_1  | Refreshing lease; still the leader.
server1_1  | Refreshing lease; still the leader.
server1_1  | Refreshing lease; still the leader.
server1_1  | Refreshing lease; still the leader.
server1_1  | Refreshing lease; still the leader.
```
