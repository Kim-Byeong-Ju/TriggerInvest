import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization", "appkey", "appsecret"]
}));

app.use(express.json());

app.get("/api/stocks/stock-symbol", async (req, res) => {
    try {
        const { stockCode } = req.query;
        if (!stockCode) {
            return res.status(400).json({ error: "stockCode is required" });
        }

        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/search-stock-info", {
            params: {
                PRDT_TYPE_CD: "300",
                PDNO: stockCode
            },
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "CTPF1002R"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/stock-current-price", async (req, res) => {
    try {
        const { stockCode } = req.query;
        if (!stockCode) {
            return res.status(400).json({ error: "stockCode is required" });
        }

        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price", {
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_input_iscd: stockCode
            },
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHKST01010100"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy Server running on http://localhost:${PORT}`);
});
