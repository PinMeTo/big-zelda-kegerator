'use strict';

const clui = require('clui'),
	clear = require("cli-clear"),
	pad = require('pad'),
	colors = require('colors'),
	loki = require('lokijs');

	var db = new loki('kegirator.json');

	var kegsDB = db.addCollection('kegs');
	var status = {message:"starting"};
	

var Gauge = clui.Gauge;
//18keg = 4,5 kg
//19keg = 4,5 kg
const kegs = [
	{
		tap: 1,
		name: "Bashah",
		percent: 9.7,
		current: 0,
		max: 19,
		kegweight: 0
	},
	{
		tap: 2,
		name: "Empire stout",
		percent: 8.5,
		current: 0,
		max: 18,
		kegweight: 0
	},
	{
		tap: 3,
		name: "404",
		percent: 0,
		current: 0,
		max: 19,
		kegweight: 0
	}
];

kegsDB.insert(kegs);

var server = require('./server.js')(kegsDB, status);


const printKeg = (keg) => {
	console.log(`Tap ${keg.tap}`);
	console.log(`${pad(keg.name, 30).rainbow} ${pad(4,keg.percent)}%`)
	let str = `${Gauge(keg.current, keg.max, 35)}`;
	console.log(str);
	console.log("");
};

const getKegStatus = () => {
	var results = kegsDB.find();
	return results;
};

const print = () => {
	let kegs = getKegStatus();
	clear();

	console.log("BeerMeTo".blue);
	console.log("");	

	kegs.forEach(printKeg);
	console.log("");
	console.log(`Status: ${status.message}`);
	setTimeout(print, 1000);
};

print();