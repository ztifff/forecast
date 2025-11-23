📦 Inventory Reorder Prediction Dashboard

A lightweight web application that predicts inventory reorder needs using TensorFlow.js.
This tool helps small businesses and store owners anticipate low-stock situations and prevent supply shortages through simple forecasting.

🔗 Live Demo: https://forecast-ufkp11l78-ztifffs-projects.vercel.app/

🔗 GitHub Repo: https://github.com/ztifff/forecast

🚀 Overview

The Inventory Reorder Prediction Dashboard analyzes historical inventory movement and predicts future stock levels to help determine when you should reorder items.

This project is built using:

React.js — UI and component logic

TensorFlow.js — machine learning forecasting

Vercel — hosting and deployment

Bootstrap + Custom CSS — interface styling

The system is intentionally simple for beginners and small business owners who need fast, easy insights without complex dashboards.

📊 Features
✅ Machine Learning Forecast

Uses TensorFlow.js to predict future inventory consumption

Simple model suitable for lightweight real-time predictions

✅ Interactive Input

Enter past inventory data

Choose days to forecast

Instantly see predicted reorder levels

✅ Modern UI

Clean dashboard layout

Fully responsive

Light & fast

✅ Zero Backend

Entirely client-side

Runs directly in the browser

🛠️ Technologies Used
Technology	Use
React.js	Main framework
TensorFlow.js	Forecasting model
Bootstrap 5	UI styling
Vercel	Deployment platform
JavaScript (ES6+)	App logic
📥 Installation & Setup

Clone the repository:

git clone https://github.com/ztifff/forecast.git
cd forecast


Install dependencies:

npm install


Start development server:

npm start


Build for production:

npm run build


Deploy to Vercel:

vercel

📁 Project Structure
src/
│── components/
│   └── InventoryPredictor.js
│── data/
│── App.js
│── index.js
│── styles/
│   └── global.css
public/
README.md

🤖 Forecasting Approach

The app uses a simple TensorFlow sequential model:

Normalizes the input data

Trains a small dense neural network

Predicts future stock movement

Displays results on-screen

This model is intentionally minimal to ensure fast browser performance.

📌 Future Improvements (Planned)

Export forecast data to CSV

Add charts (Recharts / Chart.js)

Save inventory history in localStorage

Multi-item prediction support

Improved ML model for accuracy
