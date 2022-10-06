

var express = require('express');



module.exports = (io) => {
	const t1 = function(test){
		io.execSql("insert into test values (?)",[test]).then((r) => console.log(r)).catch(err => console.log(err));
	}


	return {
		t1
	}
}
