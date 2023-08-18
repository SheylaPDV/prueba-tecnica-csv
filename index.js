const fs = require("fs");
const csv = require("csv-parser");

const results = []; // list of employees

let men = 0; // men counter
let women = 0; // women counter
let totalSalaries = 0; // sumatory of salaries

// csv reading
fs.createReadStream("datos_prueba_tecnica.csv")
  .pipe(
    csv({
      separator: ";",
      newline: "\n",
      mapHeaders: ({ header, index }) =>
        // Normalize headers
        header
          .toLowerCase()
          .trim()
          .replaceAll(" ", "_")
          .replace(/[^\w\s]/gi, ""),
    })
  )
  .on("data", (data) => results.push(data))

  .on("end", () => {
    results.forEach((res, index) => {
      // genre checking
      if (res.genre == "H") {
        men++;
      } else if (res.genre == "M") {
        women++;
      }

      // Sumatory of salaries
      totalSalaries += Number(res.salario_bruto_anual);

      // Checking Equilibrha HR employees with salary above 28000
      if (
        res.salario_bruto_anual > "28000" &&
        res.nombre_empresa == "Equilibrha RRHH"
      ) {
        console.log(
          res.id_empleado,
          res.nombre,
          res.apellido1,
          res.apellido2,
          res.salario_bruto_anual,
          res.nombre_empresa
        );
      }
    });

    console.log(
      `En total hay ${
        men + women
      } empleados: ${men} hombres y ${women} mujeres `
    );
    console.log(
      `El salario bruto anual de los empleados en la empresa es de ${totalSalaries}`
    );
  });
