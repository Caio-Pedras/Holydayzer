import express, { response } from "express";
import cors from "cors";
const app = express();
app.use(cors());

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "3/1/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" },
];
const hoje = new Date();

function isTodayHoliday(date) {
  const result = holidays.some(
    (obj) => obj.date === date.toLocaleDateString("en-us")
  );

  if (result) {
    let feriado = holidays.filter(
      (obj) => obj.date === date.toLocaleDateString("en-us")
    );
    return `Sim, hoje é ${feriado[0].name}`;
  } else return "Não, hoje não é feriado";
}
function monthHolidays(month) {
  let monthHolidays = holidays.filter(
    (obj) => Number(obj.date.split("/")[0]) === Number(month)
  );
  return monthHolidays;
}

app.get("/is-today-holiday", (req, res) => res.send(isTodayHoliday(hoje)));
app.get("/holidays", (req, res) => res.send(holidays));
app.get("/holidays/:month", (req, res) => {
  const month = req.params.month;
  res.send(monthHolidays(month));
});
app.listen(3000);
