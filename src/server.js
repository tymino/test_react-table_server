import dotenv from 'dotenv';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());

app.get('/api/table-component', async (req, res) => {
  try {
    const resTableData = await pool.query('SELECT * FROM test_table_component');
    const resTableName = await pool.query('SELECT * FROM test_table_component_name_ru');
    
    const tableObj = { header: resTableName.rows, body: resTableData.rows };
    
    res.json(tableObj);
  } catch (error) {
    throw error;
  }
});

app.get('/', (req, res) => res.end('index'));

app.listen(PORT, () => console.log('Server start'));
