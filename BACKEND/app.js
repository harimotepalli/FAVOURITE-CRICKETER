const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cricketerRoutes = require('./routes/cricketerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cricketersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use('/api/cricketers', cricketerRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
