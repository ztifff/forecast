import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export default function InventoryPredictor() {
  const [products, setProducts] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://192.168.99.100:8082/api/products"); // Update your API URL
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Predict reorder for all products
  const handlePredictAll = async () => {
    if (!products.length) return;
    setLoading(true);

    // 1. Create TensorFlow model
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [3], units: 8, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

    model.compile({
      optimizer: "adam",
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    // Example training data (replace with real historical data if available)
    const trainingData = tf.tensor2d([
      [20, 50, 3],
      [5, 30, 5],
      [15, 40, 4],
      [8, 60, 2],
    ]);
    const outputData = tf.tensor2d([[0], [1], [0], [1]]);

    // Train the model
    await model.fit(trainingData, outputData, { epochs: 200, shuffle: true });

    // Predict for all products
    const newPredictions = {};
    for (const product of products) {
      const input = tf.tensor2d([[product.inventory, product.avg_sales, product.lead_time]]);
      const result = model.predict(input);
      const value = (await result.data())[0];
      newPredictions[product.id] = value > 0.5 ? "Reorder" : "No Reorder";
    }

    setPredictions(newPredictions);
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Inventory Reorder Dashboard</h2>

      <div className="text-center mb-3">
        <button
          className="btn btn-primary"
          onClick={handlePredictAll}
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Reorders"}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Product Name</th>
              <th>Inventory</th>
              <th>Avg Sales / Week</th>
              <th>Lead Time (days)</th>
              <th>Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const suggestion = predictions[product.id] || "Pending";
              const className =
                suggestion === "Reorder"
                  ? "table-danger text-center fw-bold"
                  : suggestion === "No Reorder"
                  ? "table-success text-center fw-bold"
                  : "text-center";

              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.inventory}</td>
                  <td>{product.avg_sales}</td>
                  <td>{product.lead_time}</td>
                  <td className={className}>{suggestion}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
