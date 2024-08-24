import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import PostOfficeCard from "./PostOfficeCard";

function PincodeLookup() {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const handleLookup = async () => {
    if (pincode.length !== 6) {
      setError("Pincode must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data.Status === "Error") {
        setError("Error fetching data");
        setPostOffices([]);
      } else {
        setPostOffices(data.PostOffice);
      }
    } catch (error) {
      setError("Error fetching data");
      setPostOffices([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPostOffices = postOffices.filter((po) =>
    po.Name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button onClick={handleLookup}>Lookup</button>
      </div>
      {loading && <Loader />}
      {error && <div>{error}</div>}
      <input
        type="text"
        placeholder="Filter by Post Office name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {filteredPostOffices.length > 0 ? (
          filteredPostOffices.map((po, index) => (
            <PostOfficeCard key={index} postOffice={po} />
          ))
        ) : (
          <div>Couldn’t find the postal data you’re looking for...</div>
        )}
      </div>
    </div>
  );
}

export default PincodeLookup;
