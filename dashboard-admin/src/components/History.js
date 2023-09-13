import React, { useEffect, useState } from "react";
import {
  getAllHistorical,
  deleteHistoricalById,
} from "service/historicalService";
import Swal from "sweetalert2";
import { formatDate } from "utils/text-formatting";
function Hestory({ ideaId, frefresh }) {
  const [historical, setHistorical] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const deleteHistoric = async (id) => {
    const result = await Swal.fire({
      title: " supprimer historique ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "comfermer",
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      const res = await deleteHistoricalById(id);
      console.log(res);
      Swal.fire("L'historique a été supprimé avec succès.", "", "success");
      setRefresh(!refresh);
    }
  };
  useEffect(() => {
    const fetchHestory = async (id) => {
      const res = await getAllHistorical(id);
      setHistorical(res);
    };
    fetchHestory(ideaId);
  }, [refresh, frefresh]);
  return (
    <div className="mt-4  ">
      {historical.map((historical) => {
        return (
          <div className="border rounded border-2 border-dark p-5 mt-2">
            <div className="row">
              <div className="col-md-8">
                <h6 className="date">{historical.title}</h6>
              </div>
              <div className=" col-md-4 mb-2">
                <button
                  className="btn border-0"
                  onClick={() => deleteHistoric(historical._id)}
                >
                  <i className="nc-icon nc-simple-remove text-danger font-weight-bold"></i>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <strong>{formatDate(historical.date)}</strong>
              </div>
            </div>
            <div className="row">
              <div className=" col-md-12 mb-2">
                <span>{historical.description}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Hestory;
