import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vehicle Rental API",
      version: "1.0.0",
      description: "REST API for Vehicle Rental System",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
      },
    ],

    // এখানে add করবে
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.route.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
