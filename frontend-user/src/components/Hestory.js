import React, { useEffect, useState } from "react";
import { getAllHistorical } from "../service/historicalService";
import { formatDate } from "../utils/formate_text";
function Hestory({ ideaId }) {
  const [historical, setHistorical] = useState([]);
  useEffect(() => {
    const fetchHestory = async (id) => {
      const res = await getAllHistorical(id);
      setHistorical(res);
    };
    fetchHestory(ideaId);
  }, []);
  return (
    <div className="mt-4">
      <div className="py-4">
        {historical.map((historical) => {
          return (
            <div className="bg-light border border-dark rounded mt-1 p-2">
              <div className="post-entry-1">
                <div className="text-success">
                  <h6 className="date">{historical.title}</h6>
                  <span>
                    <strong>{formatDate(historical.date)}</strong>
                  </span>
                </div>
                <div className="mb-2">
                  <span>{historical.description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Hestory;
