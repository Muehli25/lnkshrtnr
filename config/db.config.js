module.exports = function (){
    switch(process.env.NODE_ENV) {
        case 'production':
            console.log("running in production mode");
            return {
                HOST: "db",
                USER: "root",
                PASSWORD: "example",
                DB: "lnkshrt",
                dialect: "mariadb",
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        default:
            return {
                HOST: "localhost",
                USER: "root",
                PASSWORD: "example",
                DB: "lnkshrt",
                dialect: "mariadb",
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
    }
  };
