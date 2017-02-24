'use strict';

const clui = require('clui'),
	clear = require("cli-clear"),
	pad = require('pad'),
	colors = require('colors'),
	loki = require('lokijs');

	var db = new loki('kegirator.json');

	var kegsDB = db.addCollection('kegs');
	
	

var Gauge = clui.Gauge;

const kegs = [
	{
		tap: 1,
		name: "Basha",
		percent: 5.5,
		current: 5,
		max: 9
	},
	{
		tap: 2,
		name: "Empire stout",
		percent: 3,
		current: 1,
		max: 19
	},
	{
		tap: 3,
		name: "404",
		percent: 3,
		current: 1,
		max: 19
	}
];

kegsDB.insert(kegs);

var server = require('./server.js')(kegsDB);


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
	setTimeout(print, 1000);
};

print();