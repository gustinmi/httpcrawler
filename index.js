const http = require('http');
const cheerio = require('cheerio');
const { Tree, Node } = require('./tree.js');

var treeRoot = new Node(null, "root");

function optBuilder(node){

	var catId = node.id;

	return {
		id : catId,
		node : node,
	    httpOptions : {
		    host: "proxy.gov.si",
		    port: 80,
		    path: catId ? "http://www.bolha.com/vse-kategorije?id=" + catId : "http://www.bolha.com/vse-kategorije",
		    headers: {
		        "Host": "www.bolha.com",
		        "Referer": "http://www.bolha.com/vse-kategorije",
		        "User-Agent": "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
		    }
	    }
	};

}

function buildNode(text){
    var subId = text.substring(text.indexOf("[") + 1, text.indexOf("]"));
    var subName = text.substring(0, text.indexOf("[")).trim();
    return new Node(subId, subName);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var reqCount = 0;

var count = 0;

function getChildren(opts, finishedCb){
	//debugger;


	http.get(opts.httpOptions, (resp) => {

	    let data = '';

	    reqCount++;

	    // A chunk of data has been recieved.
	    resp.on('data', (chunk) => {data += chunk; });

	    // The whole response has been received. Print out the result.
	    resp.on('end', () => {

 			if (reqCount % 100 == 0){
 				console.log("REQUESTS " + reqCount);
 			}

			//debugger;
	        const $ = cheerio.load(data, { // load html into cherio $ object
	            normalizeWhitespace: true,
	            xmlMode: true,
	            decodeEntities: true
	        });

	        if (opts.node.id == null){ // save the number of elements with rootnode as parent, for exiting async recursion
				count = $('#allCategories li').length;
	        }

	        
	        $('#allCategories li').each(function(i, elem) {
				//debugger;
	        	if ($(this).children('.allCatLink').length > 0){
					var n = buildNode($(this).children('.allCatLink').text());
					opts.node.addChild(n);

					setTimeout(function(){ // wait some time to skip DDOS filters
						getChildren(optBuilder(n), finishedCb);
					}, getRandomArbitrary(300, 999));


	        	}else{
					var n = buildNode($(this).text());
					opts.node.addChild(n);
	        	}

	        });
        
	        // if branch has a root as parent, decrease counter
			if (opts.node.getParentNode() && opts.node.getParentNode().id == null){
				//debugger;
				count--;
			}
	        
	    });

	}).on("error", (err) => { // END LEAF
		console.log("Error: " + err.message); 
		console.log("Count " + count);
		debugger;
		
		if (count === 0 && finishedCb !== undefined){
			debugger;
            finishedCb();
		}

	});

}

getChildren(optBuilder(treeRoot), () => {
	debugger;
	var treeInstance = new Tree(treeRoot);
	treeInstance.traverse();
});