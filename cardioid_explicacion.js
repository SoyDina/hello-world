var canvas = document.getElementById('cardioide_explicacion');
var ctx = canvas.getContext('2d');

var ancho = canvas.width;
var alto = canvas.height;
var radio = Math.min(ancho/2 - 10, alto/2 - 10);

function circulo(){
	rojo = 255/3 * Math.cos(factor/5 + offset * 3 * 3.3333) + 255/2;
	azul = 255/3 * Math.sin(factor/5 + offset * 3 * 3.3333) + 255/2;
	ctx.beginPath();
	ctx.arc(ancho/2, alto/2, radio, 0, 2 * Math.PI,false);
	ctx.strokeStyle = 'rgba(255,'+azul.toString()+','+rojo.toString()+', 1)';
	ctx.stroke();

}

function cardioide(factor, d, offset){


	rojo = 255/3 * Math.cos(factor/5 + offset * 3 * 3.3333) + 255/2;
	azul = 255/3 * Math.sin(factor/5 + offset * 3 * 3.3333) + 255/2;
	ctx.translate(ancho/2 + offset, alto/2 + offset);
	for (var i = 1; i <= 1/d; i++) {
		ctx.beginPath();
		ctx.rotate(2 * Math.PI * d * i);
		ctx.moveTo(-radio,0);
		ctx.rotate(-2 * Math.PI * d * i);
		ctx.rotate(2 * Math.PI * d * i * factor);
		ctx.lineTo(-radio,0);
		ctx.rotate(-2 * Math.PI * d * i * factor);
		ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
		ctx.lineWidth = 1.2;
		ctx.stroke();
	}
	ctx.translate(-ancho/2 - offset, -alto/2 - offset);

}

function marcar(d){
	ctx.translate(ancho/2 , alto/2);
	for (var i = 1; i <= 1/d; i++) {

		ctx.rotate(2 * Math.PI * d * i);
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255,0,0,1)';
		ctx.fillStyle = "#000";
		ctx.arc(-radio, 0, 3, 0, 2*Math.PI);
		ctx.fill();
		ctx.rotate(-2 * Math.PI * d * i);
	}
	ctx.translate(-ancho/2 - offset, -alto/2 - offset);
}

function enumerar(d){
	ctx.translate(ancho/2, alto/2);
	for(var i = 1; i<= 1/d; i++){
		ctx.rotate(2*Math.PI * d * (i-1));
		ctx.font = "18px Jazz";
		ctx.fillText(i-1, -radio - 25, 0);
		ctx.rotate(-2*Math.PI *d * (i-1));
	}
	ctx.translate(-ancho/2, -alto/2);
}


var d = 1/10;
var factor = 2;
var offset = 0.3;
function animar(){
	requestAnimationFrame(animar);
	ctx.clearRect(0,0,ancho, alto);

	circulo();
	cardioide(factor,d, 0);
	console.log("hola")
}


animar();

