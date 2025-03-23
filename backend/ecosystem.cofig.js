module.exports = {
    apps: [
        {
            name: "social-medial",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "eviroment-variable",
            }
        }
    ]
}