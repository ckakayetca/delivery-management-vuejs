module.exports = {
  apps : [
      {
        name: "backend",
        script: "./index.js",
        watch: true,
        env: {
            "PORT": 3000,
            "NODE_ENV": "production"
        }
      }
  ]
}
