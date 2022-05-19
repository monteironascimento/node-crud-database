module.exports = {
    apps : [{
      name: `database`,
      version: "1.0.0",
      script: "ts-node ./src/index.ts",
      namespace: `DATABASE`,
       // Delay between restart
      //exec_mode: "cluster",
      autorestart: false,
      watch: true,
      //max_memory_restart: '512M',
      //watch_delay: 10000,
      //kill_timeout: 3000,
      //instances: "1",
      //max_memory_restart: "1G",
      ignore_watch : ["node_modules"],
      watch_options: {
        "followSymlinks": false
      },
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_production: {
        NODE_ENV: "production",
      },

    }]
  }



  

 