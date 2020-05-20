var canvas = document.getElementById('cardioide_animacion');
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
		ctx.strokeStyle = 'rgba(255,'+azul.toString()+','+rojo.toString()+',1)';
		ctx.lineWidth = 1.2;
		ctx.stroke();
	}
	ctx.translate(-ancho/2 - offset, -alto/2 - offset);
}



var d = 1/300;
var factor = document.getElementById("factor").value;
var vel = document.getElementById("velocidad").value;
var offset = 0.3;
function animar_cardioide(){
	vel = parseFloat(document.getElementById("velocidad").value);
	factor = parseFloat(document.getElementById("factor").value) + vel;
	requestAnimationFrame(animar);
	ctx.clearRect(0,0,ancho, alto);
	circulo();
	cardioide(factor,d, 0);
	cardioide(factor,d,offset);
	document.getElementById("factor").value = factor.toString();
}


animar_cardioide();

