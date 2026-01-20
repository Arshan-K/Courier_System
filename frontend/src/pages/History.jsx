import React, { useEffect, useState } from "react";
import { fetchHistories } from "../api/auth";
import HistoryTable from "./HistoryTable";

export default function History() {
const [couriers, setCouriers] = useState([]);

useEffect(() => {
  fetchHistories().then(setCouriers);
}, []);

return (<HistoryTable couriers={couriers} />);
}