module.exports = {
  apps: [
    {
      name: "boxland",
      script: "npm run start",
      cwd: "./",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      // args: "one two",
      instances: 1,
      autorestart: true,
      watch: [".next"],
      ignore_watch: ["node_modules", "logs", "static"],
      node_args: "--harmony",
      max_memory_restart: "200M",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
