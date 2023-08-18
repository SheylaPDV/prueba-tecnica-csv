const fs = require("fs");
const csv = require("csv-parser");

// Leer el archivo de datos
const results = [];

fs.createReadStream("datos_prueba_tecnica.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", () => {
    console.log(results.nombre);

    results.forEach((empleado) => {
      console.log(
        `ID: ${empleado.id}, Nombre: ${empleado.nombre}, Salario: ${empleado.salario}`
      );
    });
  });
