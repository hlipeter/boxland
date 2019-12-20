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
      watch: [".next"], // 监听文件目录变化
      ignore_watch: ["node_modules", "logs", "static"],
      node_args: "--harmony",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "boxser",
      host: "106.14.194.34",
      ref: "origin/master",
      repo: "git@github.com:hlipeter/boxland.git",
      path: "/www/boxland/",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
