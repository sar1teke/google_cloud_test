const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL Bağlantısı
const pool = new Pool({
  user: 'ismail',
  host: '34.59.3.14', // Cloud IP adresiniz
  database: 'phoenix',
  password: '1',
  port: 5432,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Ana sayfa form gösterme
app.get('/', (req, res) => {
  pool.query('SELECT * FROM bilgiler', (err, result) => {
    if (err) {
      return res.send('Verileri çekerken hata oluştu: ' + err);
    }
    res.render('index', { veriler: result.rows });
  });
});

// Formdan gelen veriyi ekleme
app.post('/ekle', (req, res) => {
  const { isim, sehir } = req.body;
  pool.query('INSERT INTO bilgiler (isim, sehir) VALUES ($1, $2)', [isim, sehir], (err) => {
    if (err) {
      return res.send('Kayıt sırasında hata oluştu: ' + err);
    }
    res.redirect('/');
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Sunucu çalışıyor: http://0.0.0.0:3000');
});

