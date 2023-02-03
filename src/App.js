import { useState, useEffect } from "react";
import Bug from "./conponents/bug";
import axios from "axios";
import { xml2js } from "xml-js";

function App() {
  const convert = require(`xml-js`);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(true);
  const [weathers, setWeathers] = useState([[0, 0]]);
  const [regionId, setRegionId] = useState(146);
  const [index, setIndex] = useState("-1");
  const [error, setError] = useState(null);
  const serviceKey = process.env.REACT_APP_SERVICE_KEY;
  const [year, setYear] = useState("");
  const [yearCheck, setYearCheck] = useState(false);
  const [month, setMonth] = useState("");
  const [monthCheck, setMonthCheck] = useState(false);
  const [day, setDay] = useState("");
  const [dayCheck, setDayCheck] = useState(false);
  const [regionCheck, setRegionCheck] = useState(false);
  const [buttonCheck, setButtonCheck] = useState(false);
  const [dayArray, setDayArray] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ]);
  const [yearAdd, setYearAdd] = useState("");
  const [monthAdd, setMonthAdd] = useState("");
  const [dayAdd, setDayAdd] = useState("");
  const [date, setDate] = useState("");
  const [dateAdd, setDateAdd] = useState("");
  let weatherArray = [];
  const onSelect = (event) => {
    setIndex(event.currentTarget.value);
  };
  const apiURL = `https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${serviceKey}&pageNo=1&numOfRows=70&dataType=XML&dataCd=ASOS&dateCd=DAY&startDt=${date}&endDt=${dateAdd}&stnIds=${regionId}`;
  const TropicalCasterMothGrothTempArray = [
    [null, 13.01, 12.12, 13.06],
    [null, 35.68, 204.6, 150.54],
  ]; //발육영점온도/유효적산온도 산란전기 알 유충 번데기 순서 알~성충 발육은 평균 유효는 합
  const fetchApi = async () => {
    try {
      setApiLoading(true);
      let res = await axios.get(apiURL, {
        "Content-Type": "application/xml; charset=utf-8",
      });
      let xmlToJson = await JSON.parse(convert.xml2json(res.data));
      console.log("xmlToJson", xmlToJson);
      for (let i = 0; i < 70; i++) {
        weatherArray.push([
          xmlToJson.elements[0].elements[1].elements[1].elements[i].elements[3]
            .elements[0].text,
          xmlToJson.elements[0].elements[1].elements[1].elements[i].elements[2]
            .elements[0].text,
        ]);
      }
      setWeathers(weatherArray);
    } catch (e) {
      setError(e);
      console.log(error);
    }
    setApiLoading(false);
    setLoading(false);
  };

  const onYearSelect = (event) => {
    console.log("onYearSelect", event.target.value);
    setYear(event.target.value);
    setYearCheck(true);
  };
  const onMonthSelect = (event) => {
    console.log("onMonthSelect", event.target.value);
    setMonth(event.target.value);
    setMonthCheck(true);
  };
  const onDaySelect = (event) => {
    console.log("onDaySelect", event.target.value);
    setDay(event.target.value);
    setDayCheck(true);
  };
  const onRegionSelect = (event) => {
    console.log("onRegionSelect", event.target.value);
    setRegionId(event.target.value);
    setRegionCheck(true);
  };
  const onClickButton = () => {
    setYearCheck(false);
    setMonthCheck(false);
    setDayCheck(false);
    setRegionCheck(false);
    setButtonCheck(!buttonCheck);
  };

  const dayArrayChange = async () => {
    console.log(month);
    if (month === ("01" || "03" || "05" || "07" || "08" || "10" || "12")) {
      setDayArray([
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ]);
    } else if (month === "02") {
      setDayArray([
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
      ]);
    } else {
      setDayArray([
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ]);
    }
  };
  const dayPlus = async () => {
    if (month === "11") {
      setYearAdd(Number(year) + 1);
      setMonthAdd("01");
      setDayAdd("28");
    } else if (month === "12") {
      setYearAdd(Number(year) + 1);
      setMonthAdd("02");
      setDayAdd("28");
    } else if (month === ("08" || "09" || "10")) {
      setYearAdd(Number(year));
      setMonthAdd(`${Number(month) + 2}`);
      setDayAdd("28");
    } else {
      setYearAdd(Number(year));
      setMonthAdd("0" + String(Number(month) + 2));
      setDayAdd("28");
    }
  };
  useEffect(() => {
    dayArrayChange();
  }, [month]);

  useEffect(() => {
    dayPlus();
    setDate(year + month + day);
  }, [buttonCheck]);

  useEffect(() => {
    setDateAdd(yearAdd + monthAdd + dayAdd);
  }, [date]);

  useEffect(() => {
    fetchApi();
    console.log("weathers", weathers);
    console.log("date", date);
    console.log("dateAdd", dateAdd);
  }, [dateAdd]);
  return (
    <div>
      <h1 className="h1">Pest Growth Prediction Sheet</h1>
      {loading ? (
        <h1>Now Loading...</h1>
      ) : (
        <div>
          <select onChange={onSelect}>
            {index === "-1" ? (
              <option value="-1">Choose what to know</option>
            ) : (
              ""
            )}
            <option value="0">열대 거세미 나방</option>
          </select>
          <select onChange={onYearSelect}>
            <option select value={"년도"}>
              년
            </option>
            <option value={"2023"}>2023년</option>
            <option value={"2022"}>2022년</option>
            <option value={"2021"}>2021년</option>
            <option value={"2020"}>2020년</option>
            <option value={"2019"}>2019년</option>
            <option value={"2018"}>2018년</option>
            <option value={"2017"}>2017년</option>
          </select>
          {yearCheck ? (
            <select onChange={onMonthSelect}>
              <option select value={"월"}>
                월
              </option>
              <option value={"01"}>1월</option>
              <option value={"02"}>2월</option>
              <option value={"03"}>3월</option>
              <option value={"04"}>4월</option>
              <option value={"05"}>5월</option>
              <option value={"06"}>6월</option>
              <option value={"07"}>7월</option>
              <option value={"08"}>8월</option>
              <option value={"09"}>9월</option>
              <option value={"10"}>10월</option>
              <option value={"11"}>11월</option>
              <option value={"12"}>12월</option>
            </select>
          ) : (
            <select disabled>
              <option disabled select value={"월"}>
                월
              </option>
            </select>
          )}
          {yearCheck && monthCheck ? (
            <select onChange={onDaySelect}>
              <option disabled select value={"일"}>
                일
              </option>
              {dayArray.map((item) => (
                <option value={`${item}`} key={`${item}`}>
                  {`${item}`}일
                </option>
              ))}
            </select>
          ) : (
            <select disabled>
              <option disabled select value={"일"}>
                일
              </option>
            </select>
          )}
          {yearCheck && monthCheck && dayCheck ? (
            <select onChange={onRegionSelect}>
              <option value={"지역"}>지역</option>
              <option value={90}>속초</option>
              <option value={93}>북춘천</option>
              <option value={95}>철원</option>
              <option value={98}>동두천</option>
              <option value={99}>파주</option>
              <option value={100}>대관령</option>
              <option value={101}>춘천</option>
              <option value={102}>백령도</option>
              <option value={104}>북강릉</option>
              <option value={105}>강릉</option>
              <option value={106}>동해</option>
              <option value={108}>서울</option>
              <option value={112}>인천</option>
              <option value={114}>원주</option>
              <option value={115}>울릉도</option>
              <option value={119}>수원</option>
              <option value={121}>영원</option>
              <option value={127}>충주</option>
              <option value={129}>서산</option>
              <option value={130}>울진</option>
              <option value={131}>청주</option>
              <option value={133}>대전</option>
              <option value={135}>추풍령</option>
              <option value={136}>안동</option>
              <option value={137}>상주</option>
              <option value={138}>포항</option>
              <option value={140}>군산</option>
              <option value={143}>대구</option>
              <option value={146}>전주</option>
              <option value={152}>울산</option>
              <option value={155}>창원</option>
              <option value={156}>광주</option>
              <option value={159}>부산</option>
              <option value={162}>통영</option>
              <option value={165}>목포</option>
              <option value={168}>여수</option>
              <option value={169}>흑산도</option>
              <option value={170}>완도</option>
              <option value={172}>고창</option>
              <option value={174}>순천</option>
              <option value={177}>홍성</option>
              <option value={184}>제주</option>
              <option value={185}>고산</option>
              <option value={188}>성산</option>
              <option value={189}>서귀포</option>
              <option value={192}>진주</option>
              <option value={201}>강화</option>
              <option value={202}>양평</option>
              <option value={203}>이천</option>
              <option value={211}>인제</option>
              <option value={212}>홍천</option>
              <option value={216}>태백</option>
              <option value={217}>정선군</option>
              <option value={221}>제천</option>
              <option value={226}>보은</option>
              <option value={232}>천안</option>
              <option value={235}>보령</option>
              <option value={236}>부여</option>
              <option value={238}>금산</option>
              <option value={239}>세종</option>
              <option value={243}>부안</option>
              <option value={244}>임실</option>
              <option value={245}>정읍</option>
              <option value={247}>남원</option>
              <option value={248}>장수</option>
              <option value={251}>고창군</option>
              <option value={252}>영광군</option>
              <option value={253}>김해시</option>
              <option value={254}>순창군</option>
              <option value={255}>북창원</option>
              <option value={257}>양산시</option>
              <option value={258}>보성군</option>
              <option value={259}>강진군</option>
              <option value={260}>장흥</option>
              <option value={261}>해남</option>
              <option value={262}>고흥</option>
              <option value={263}>의령군</option>
              <option value={264}>함양군</option>
              <option value={266}>광양시</option>
              <option value={268}>진도군</option>
              <option value={271}>봉화</option>
              <option value={272}>영주</option>
              <option value={273}>문경</option>
              <option value={276}>청송군</option>
              <option value={277}>영덕</option>
              <option value={278}>의성</option>
              <option value={279}>구미</option>
              <option value={281}>영천</option>
              <option value={283}>경주시</option>
              <option value={284}>거창</option>
              <option value={285}>합천</option>
              <option value={288}>밀양</option>
              <option value={289}>산청</option>
              <option value={294}>거제</option>
              <option value={295}>남해</option>
            </select>
          ) : (
            <select disabled>
              <option disabled select value={"지역"}>
                지역
              </option>
            </select>
          )}
          {yearCheck && monthCheck && dayCheck && regionCheck ? (
            <button onClick={onClickButton} type="button">
              확인
            </button>
          ) : (
            <button disabled type="button">
              확인
            </button>
          )}
        </div>
      )}
      <hr />
      {apiLoading ? (
        <h1>Now Loading...</h1>
      ) : index === "0" ? (
        <Bug weathers={weathers} temp={TropicalCasterMothGrothTempArray} />
      ) : null}
    </div>
  );
}
export default App;
