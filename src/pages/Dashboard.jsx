import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: { "X-Api-Key": "N0dpxSF7n9ZzQWlKR7PTMw==89CmXknSEHwbmZrQ" },
    })
    .then(res => setQuote(res.data[0]?.quote))
    .catch(() => setQuote("Stay motivated and keep learning!"));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="p-4 bg-white rounded-xl shadow">
        <p className="text-gray-700 italic">“{quote}”</p>
      </div>
    </div>
  );
}
