import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TableAirport = ({ handleGetInfo }) => {
  const [allResult, setAllResult] = useState(0);
  const [airportInfo, setAirportInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(7);
  const [query, setQuery] = useState("");
  const [cookie, setCookie] = useState("initial");

  const navigate = useNavigate();

  useEffect(() => {
    setCookie(Cookies.get("token"));

    const getAirport = async () => {
      const url = `http://localhost:8000/api/get-airport?page=${page}&size=${size}`;
      const urlResult = `http://localhost:8000/api/getallresult`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Set-Cookie": Cookies.get("token"),
          token: Cookies.get("token"),
        },
        credentials: "include",
      });

      const responseResult = await fetch(urlResult, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
        credentials: "include",
      });

      const jsonData = await response.json();
      const resultData = await responseResult.json();

      console.log(jsonData);

      if (!cookie) {
        navigate("/");
      }
      setAirportInfo(jsonData.payload);
      setAllResult(resultData.result);
    };

    getAirport();
  }, [page, size, cookie]);

  const prevPage = (e) => {
    e.preventDefault();
    if (airportInfo[0]?.id > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (airportInfo[lastInfo]?.id < allResult) {
      setPage((prev) => prev + 1);
    }
  };

  const lastInfo = airportInfo.length - 1;

  return (
    <div className="airport">
      <div className="airport-header">
        <div className="airport-title">
          <h1>TABLE</h1>
          <h1>AIRPORT</h1>
        </div>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
      </div>
      <table className="airport-body">
        <thead>
          <tr>
            <th>id</th>
            <th>LM_TNAME</th>
            <th>LAT</th>
            <th>LON</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {airportInfo
            .filter(
              (airport) =>
                airport.lm_tname.includes(query) ||
                airport.lat.includes(query) ||
                airport.lon.includes(query)
            )
            .map((info) => (
              <tr key={info.id}>
                <td>{info.id}</td>
                <td>{info.lm_tname}</td>
                <td>{info.lat}</td>
                <td>{info.lon}</td>
                <td>
                  <button
                    onClick={(e) => {
                      handleGetInfo(e, info);
                    }}
                  >
                    ZOOM
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="airport-footer">
        <p>Choose Row:</p>
        <p>
          <a
            href=""
            name="row"
            onClick={(e) => {
              e.preventDefault();
              setSize(10);
            }}
          >
            10
          </a>
        </p>
        <p>
          <a
            href=""
            name="row"
            onClick={(e) => {
              e.preventDefault();
              setSize(25);
            }}
          >
            25
          </a>{" "}
        </p>
        <p>
          <a
            href=""
            name="row"
            onClick={(e) => {
              e.preventDefault();
              setSize(50);
            }}
          >
            50
          </a>
        </p>
        <p>
          <a
            href=""
            name="row"
            onClick={(e) => {
              e.preventDefault();
              setSize(100);
            }}
          >
            100
          </a>
        </p>
        <p>Rows per page:</p>
        <p>{airportInfo.length}</p>
        <p>
          {airportInfo[0]?.id}-{airportInfo[lastInfo]?.id} of {allResult}
        </p>
        <p>
          <a href="" onClick={prevPage}>
            {"<"}
          </a>
        </p>
        <p>
          <a href="" onClick={nextPage}>
            {">"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default TableAirport;
