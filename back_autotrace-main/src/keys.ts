export default {

    database: {
 
       // host: 'b8ff0b49f137.sn.mynetname.net',
        //host: '75.102.23.90',
        // host: '189.156.4.155',
        host: 'localhost',
        // host:'192.168.100.32',
        user: 'root', 
        // // // user :"ferrer",
        // // // password: 'Admin123.$',
        password:"",
        
        // servidor
        // host: 'b8ff0b49f137.sn.mynetname.net',
        // user: 'autotech',
        // password: 'Autotech123.$',
        database: 'autotech',
        // port: 3306,

        // [START cloud_sql_mysql_mysql_limit]
        // 'connectionLimit' is the maximum number of connections the pool is allowed
        // to keep at once.
        //connectionLimit: 10,
        // [END cloud_sql_mysql_mysql_limit]
        
        // [START cloud_sql_mysql_mysql_timeout]
        // 'connectTimeout' is the maximum number of milliseconds before a timeout
        // occurs during the initial connection to the database.
        //connectTimeout: 10000, // 10 seconds
        
        // 'acquireTimeout' is the maximum number of milliseconds to wait when
        // checking out a connection from the pool before a timeout error occurs.
        //acquireTimeout: 10000, // 10 seconds
        
        // 'waitForConnections' determines the pool's action when no connections are
        // free. If true, the request will queued and a connection will be presented
        // when ready. If false, the pool will call back with an error.
        //waitForConnections: true, // Default: true
        
        // 'queueLimit' is the maximum number of requests for connections the pool
        // will queue at once before returning an error. If 0, there is no limit.
        //queueLimit: 0, // Default: 0
        // [END cloud_sql_mysql_mysql_timeout]

        // [START cloud_sql_mysql_mysql_backoff]
        // The mysql module automatically uses exponential delays between failed
        // connection attempts.
        // [END cloud_sql_mysql_mysql_backoff]
    }
}   