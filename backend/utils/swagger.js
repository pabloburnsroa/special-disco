const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const log = require("./logger");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      description: "REST API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js", "./schema/*.js"],
};

const openapiSpecification = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
    app.get("/docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(openapiSpecification);
    });
    log.info(`Docs are available at http://localhost:${port}/docs`);
  }
}

module.exports = swaggerDocs;
