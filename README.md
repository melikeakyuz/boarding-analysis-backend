# Binis Analiz

## Install

The quickest way to get start with Node.Js, Express & MySQL, just clone the project:

```bash
$ git clone https://github.com/melikeakyuz/boarding_analysis_backend
```

Install dependencies:

```bash
$ npm install 
```
Start Express.js app at `http://localhost:8585/`:

```bash
$ npm start
```

### Nodemon

Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

Start Express.js app with nodemon at `http://localhost:8585/`:

```bash
$ nodemon ./app.js
```

## Usage

It can be reached requests from the below URL to design, build, document, and use RESTful web services.

```bash
`http://localhost:8585/swagger/`:
```

## Migration

Database can be created with this script:

```bash
CREATE TABLE binis_analiz (	
	`date` date NOT NULL,
	`route_id` int NOT NULL,
	`bus_id` int NOT NULL,
	`driver_id` int NOT NULL,
	`company_id` int NOT NULL,
	`total_usage_count` int NOT NULL,
	`total_usage_amount` int NOT NULL,
	);

CREATE TABLE users (	
	`username` varchar(50) NOT NULL,
	`password` varchar(50) NOT NULL,
	);

	CREATE TABLE date (	
	`date` date NOT NULL,
	`total_usage_count` int NOT NULL,
	`total_usage_amount` int NOT NULL,
	);

	CREATE TABLE bus (	
	`date` date NOT NULL,
	`total_usage_count` int NOT NULL,
	`total_usage_amount` int NOT NULL,
	`bus_id` int NOT NULL,
	);

	CREATE TABLE driver (	
	`date` date NOT NULL,
	`total_usage_count` int NOT NULL,
	`total_usage_amount` int NOT NULL,
	`driver_id` int NOT NULL,
	);

	CREATE TABLE route (	
	`date` date NOT NULL,
	`total_usage_count` int NOT NULL,
	`total_usage_amount` int NOT NULL,
	`route_id` int NOT NULL,
	);
```

## Configuration

See files db.config.js and db.js for the full list of configuration options, along with their descriptions and default values.

The configuration contains a list of named database connections each with the
following entries:

- host - the hostname or ip address to connect to
- port - the port mysql is listening (default: 3306)
- database - the name of the database to use
- user - the name used to log into the database
- password - the password to login
