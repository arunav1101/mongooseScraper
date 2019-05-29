const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const mongoURI='mongodb://localhost/testdb'

mongoose.connect(mongoURI, { useNewUrlParser: true });
const PORT = process.env.PORT || 3001;

app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
