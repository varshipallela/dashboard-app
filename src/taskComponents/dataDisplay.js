
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
      setChartData({
        labels: response.data.slice(0, 5).map(post => post.title),
        datasets: [
          {
            label: 'Sample Data',
            data: response.data.slice(0, 5).map(post => post.id),
            backgroundColor: 'rgba(75,192,192,0.4)',
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="data-display">
      <h2>Fetched Data</h2>
      {loading ? <p>Loading...</p> : (
        <div>
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
          <Bar data={chartData} />
          <button onClick={fetchData}>Refresh Data</button>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
