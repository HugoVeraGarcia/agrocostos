import React, { useEffect, useState } from "react";
import "../styles/Bidones.css";
import * as XLSX from "xlsx";
import Docum from "../excel/7_Bidones.xlsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Bidones() {
  const [items, setItems] = useState([]);
  const year = useSelector((state) => state.year);
  const month = useSelector((state) => state.month);
  const bidones = useSelector((state) => state.bidones);

  const [bidonesTemporal, setBidonesTemporal] = useState([]);

  const dispatch = useDispatch();

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      //console.log(d);
      setItems(d);
      d.forEach((element) => setBidonesTemporal(bidonesTemporal.push(element)));
      console.log("bidonesTemporal:-:", bidonesTemporal);
      saveData(bidonesTemporal);
    });
    //saveData(bidonesTemporal);
  };

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  useEffect(() => {
    const period = {
      year,
      month,
    };

    axios
      .post(
        `http://backend.concienciaartificial.us:4000/api/v1/bidons/get/`,
        period,
        getConfig
      )
      .then((res) =>
        dispatch({
          type: "SET_BIDONES",
          payload: res.data.bidon,
        })
      )
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch({
            type: "SET_BIDONES",
            payload: [],
          });
        }
      });
  }, [year, month, dispatch]);

  const deleteData = () => {
    const period = {
      year,
      month,
    };
    console.log("desde axios:: ", period);

    axios
      .post(`http://localhost:4000/api/v1/bidons/delete`, period)
      .then((res) =>
        dispatch({
          type: "SET_BIDONES",
          payload: [],
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const saveData = (bidonesTemporal) => {
    console.log("inicia save data");
    console.log("bidonesTemporal::>", bidonesTemporal);
    console.log("bidonesTemporal::>", bidonesTemporal.length);
    for (let i = 0; i < bidonesTemporal.length; i++) {
      console.log("dentro");
      const data = {
        ceco_type: bidonesTemporal[i].TIPO_CECO,
        ceco: bidonesTemporal[i].CECO,
        ceco_desc: bidonesTemporal[i].DESC_CECO,
        quantity: bidonesTemporal[i].TOTAL,
        year,
        month,
        year_month: `${year}${month}`,
        userId: 1,
      };

      // const data = {
      //   ceco_type: "PackingHugo",
      //   ceco: "ACG3000002",
      //   ceco_desc: "AGV-SOPORTE OPE PACK",
      //   quantity: 186,
      //   year,
      //   month,
      //   year_month: `${year}${month}`,
      //   userId: 1,
      // };

      console.log("axios::: ", data);
      axios
        .post("http://backend.concienciaartificial.us:4000/api/v1/bidons", data)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("termina save data");
  };

  return (
    <div>
      <div className="bidonButtonContainer">
        {bidones.length === 0 ? (
          <input
            className="inputBidones"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        ) : (
          ""
        )}
        {bidones.length === 0 ? (
          <a href={Docum} download="7_bidones.xlsx" className="download_file">
            Descargar Formato
          </a>
        ) : (
          ""
        )}

        {bidones.length !== 0 ? (
          <button
            className="bidonDeleteButton"
            type="button"
            onClick={deleteData}
          >
            Eliminar registros
          </button>
        ) : (
          ""
        )}
        {/* {bidonesTemporal.length !== 0 ? (
          <button className="bidonDeleteButton" onClick={console.log("hello")}>
            Grabar registros
          </button>
        ) : (
          ""
        )} */}
      </div>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">TIPO CECO</th>
            <th scope="col">CECO</th>
            <th scope="col">DESC CECO</th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>

        {bidones.length !== 0 ? (
          <tbody>
            {bidones.map((b) => (
              <tr key={b.ceco}>
                <th>{b.ceco_type}</th>
                <td>{b.ceco}</td>
                <td>{b.ceco_desc}</td>
                <td>{b.quantity}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {items.map((d) => (
              <tr key={d.CECO}>
                <th>{d.TIPO_CECO}</th>
                <td>{d.CECO}</td>
                <td>{d.DESC_CECO}</td>
                <td>{d.TOTAL}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
