import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

function Bug(props) {
  const weather = props.weathers;
  const temp = props.temp;
  const [weathers, setWeathers] = useState(weather);
  const [finalArray, setFinalArray] = useState([]);
  const tableRef = useRef(null);
  let eggTemp = 0;
  let larvaTemp = 0;
  let pupaTemp = 0;
  let array = [];
  let i = 0;
  const fillFinalArray = async () => {
    eggTemp = 0;
    larvaTemp = 0;
    pupaTemp = 0;
    for (i in weather) {
      console.log("eggTemp1", eggTemp);
      if (eggTemp < temp[1][1]) {
        console.log("eggTemp2", eggTemp);
        eggTemp =
          Math.round((eggTemp + Number(weather[i][0]) - temp[0][1]) * 100) /
          100;
        console.log("eggTemp3", eggTemp);

        array.push([
          weather[i][1],
          weather[i][0],
          temp[0][0],
          Math.round((weather[i][0] - temp[0][1]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][2]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][3]) * 100) / 100,
          Math.round(
            ((weather[i][0] - temp[0][1] + temp[0][2] + temp[0][3]) / 3) * 100
          ) / 100,
          temp[1][0],
          eggTemp,
          ,
          ,
          Math.round((eggTemp + larvaTemp + pupaTemp) * 100) / 100,
        ]);
        i++;
        console.log("eggTemp4", eggTemp);
      } else if (larvaTemp < temp[1][2]) {
        larvaTemp =
          Math.round((larvaTemp + Number(weather[i][0]) - temp[0][2]) * 100) /
          100;
        array.push([
          weather[i][1],
          weather[i][0],
          temp[0][0],
          Math.round((weather[i][0] - temp[0][1]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][2]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][3]) * 100) / 100,
          Math.round(
            (weather[i][0] - (temp[0][1] + temp[0][2] + temp[0][3]) / 3) * 100
          ) / 100,
          temp[1][0],
          ,
          larvaTemp,
          ,
          Math.round((eggTemp + larvaTemp + pupaTemp) * 100) / 100,
        ]);

        i++;
        console.log("larvaTemp:", larvaTemp);
      } else if (pupaTemp < temp[1][3]) {
        pupaTemp =
          Math.round((pupaTemp + Number(weather[i][0]) - temp[0][3]) * 100) /
          100;
        array.push([
          weather[i][1],
          weather[i][0],
          temp[0][0],
          Math.round((weather[i][0] - temp[0][1]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][2]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][3]) * 100) / 100,
          Math.round(
            ((weather[i][0] - temp[0][1] + temp[0][2] + temp[0][3]) / 3) * 100
          ) / 100,
          temp[1][0],
          ,
          ,
          pupaTemp,
          Math.round((eggTemp + larvaTemp + pupaTemp) * 100) / 100,
        ]);

        i++;
        console.log("pupaTemp = " + pupaTemp);
      } else {
        array.push([
          weather[i][1],
          weather[i][0],
          temp[0][0],
          Math.round((weather[i][0] - temp[0][1]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][2]) * 100) / 100,
          Math.round((weather[i][0] - temp[0][3]) * 100) / 100,
          Math.round(
            (weather[i][0] - (temp[0][1] + temp[0][2] + temp[0][3]) / 3) * 100
          ) / 100,
          temp[1][0],
          eggTemp,
          larvaTemp,
          pupaTemp,
          "우화",
        ]);
        break;
      }
    }
  };

  useEffect(() => {
    setWeathers(weather);
  }, [weather]);

  useEffect(() => {
    fillFinalArray();
    setFinalArray(array);
    console.log("finalArray", finalArray);
    console.log("Weather", weather);
  }, [weathers]);
  return (
    <div>
      <DownloadTableExcel
        filename={weather[0][1]}
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <button> Export excel </button>
      </DownloadTableExcel>
      <table ref={tableRef} border={1}>
        <thead></thead>
        <tbody>
          <tr>
            <th rowSpan={3}>날짜</th>
            <th rowSpan={3}>실제평균온도(C°)</th>
            <th colSpan={5}>발육영점온도</th>
            <th colSpan={5}>유효적산온도</th>
          </tr>
          <tr>
            <th>산란전기</th>
            <th>알</th>
            <th>유충</th>
            <th>번데기</th>
            <th>알~성충</th>
            <th>산란전기</th>
            <th>알</th>
            <th>유충</th>
            <th>번데기</th>
            <th>알~성충</th>
          </tr>
          <tr>
            <th>{temp[0][0]}</th>
            <th>{temp[0][1]}</th>
            <th>{temp[0][2]}</th>
            <th>{temp[0][3]}</th>
            <th>
              {Math.round(((temp[0][1] + temp[0][2] + temp[0][3]) / 3) * 100) /
                100}
            </th>
            <th>{temp[1][0]}</th>
            <th>{temp[1][1]}</th>
            <th>{temp[1][2]}</th>
            <th>{temp[1][3]}</th>
            <th>{temp[1][1] + temp[1][2] + temp[1][3]}</th>
          </tr>
          {finalArray.map((array) => (
            <tr key={array[0]}>
              <th>{array[0]}</th>
              <th>{array[1]}</th>
              <th>{array[2]}</th>
              <th>{array[3]}</th>
              <th>{array[4]}</th>
              <th>{array[5]}</th>
              <th>{array[6]}</th>
              <th>{array[7]}</th>
              <th>{array[8]}</th>
              <th>{array[9]}</th>
              <th>{array[10]}</th>
              <th>{array[11]}</th>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Bug;
