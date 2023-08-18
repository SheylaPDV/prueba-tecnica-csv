const fs = require("fs");
const csv = require("csv-parser");

const results = [];
let hombres = 0;
let mujeres = 0;
let sumaSalarios = 0;
fs.createReadStream("datos_prueba_tecnica.csv")
  .pipe(
    csv({
      separator: ";",
      newline: "\n",
      mapHeaders: ({ header, index }) =>
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
      if (res.sexo == "H") {
        hombres++;
      } else if (res.sexo == "M") {
        mujeres++;
      }
      let salarios = Number(res.salario_bruto_anual);
      sumaSalarios += salarios;
    });

    console.log(
      `En total hay ${
        hombres + mujeres
      } empleados: ${hombres} hombres y ${mujeres} mujeres `
    );
    console.log(
      `El salario bruto anual de los empleados en la empresa es de ${sumaSalarios}`
    );
  });
