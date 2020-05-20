function circulo(ctx, factor, offset, ancho, alto, radio, azul, verde){
	ctx.beginPath();
	ctx.arc(ancho/2, alto/2, radio, 0, 2 * Math.PI,false);
	ctx.strokeStyle = 'rgba(255,'+verde.toString()+','+azul.toString()+', 1)';
	ctx.stroke();

}

function cardioide(ctx, factor, d, offset, ancho, alto, radio, azul, verde){


	
	ctx.translate(ancho/2 + offset, alto/2 + offset);
	for (var i = 1; i <= 1/d; i++) {
		ctx.beginPath();
		ctx.rotate(2 * Math.PI * d * i);
		ctx.moveTo(-radio,0);
		ctx.rotate(-2 * Math.PI * d * i);
		ctx.rotate(2 * Math.PI * d * i * factor);
		ctx.lineTo(-radio,0);
		ctx.rotate(-2 * Math.PI * d * i * factor);
		ctx.strokeStyle = 'rgba(255,'+verde.toString()+','+azul.toString()+', 1)';
		ctx.lineWidth = 1.2;
		ctx.stroke();
	}
	ctx.translate(-ancho/2 - offset, -alto/2 - offset);

}

function marcar(ctx, d, offset, ancho, alto, radio){
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

function enumerar(ctx, d, ancho, alto, radio){
	ctx.translate(ancho/2, alto/2);
	for(var i = 1; i<= 1/d; i++){
		ctx.rotate(2*Math.PI * d * (i-1));
		ctx.font = "18px Jazz";
		ctx.fillText(i-1, -radio - 25, 0);
		ctx.rotate(-2*Math.PI *d * (i-1));
	}
	ctx.translate(-ancho/2, -alto/2);
}






var canvas_an = document.getElementById('cardioide_animacion');
const ctx_an = canvas_an.getContext('2d');

var ancho_an = canvas_an.width;
var alto_an = canvas_an.height;
var radio_an = Math.min(ancho_an/2 - 10, alto_an/2 - 10);
var d_an = 1/300;
var factor_an = document.getElementById("factor").value;
var vel_an = document.getElementById("velocidad").value;
var offset_an = 0.3;
var azul_an;
var verde_an;
function cardioide_animacion(){
    ctx_an.clearRect(0,0,ancho_an, alto_an);
    azul_an = 255/3 * Math.cos(factor_an/5 + offset_an * 3 * 3.3333) + 255/2;
    verde_an = 255/3 * Math.sin(factor_an/5 + offset_an * 3 * 3.3333) + 255/2;
    circulo(ctx_an, factor_an, offset_an, ancho_an, alto_an, radio_an, azul_an, verde_an);
	cardioide(ctx_an, factor_an, d_an, 0, ancho_an, alto_an, radio_an, azul_an, verde_an);
  //  cardioide(ctx_an, factor_an, d_an, offset_an, ancho_an, alto_an, radio_an, azul_an, verde_an);
    vel_an = parseFloat(document.getElementById("velocidad").value);
    factor_an = parseFloat(document.getElementById("factor").value) + vel_an;
    document.getElementById("factor").value = factor_an.toString();
}



var canvas_ex = document.getElementById('cardioide_explicacion');
const ctx_ex = canvas_ex.getContext('2d');

var ancho_ex = canvas_ex.width;
var alto_ex = canvas_ex.height;
var radio_ex = Math.min(ancho_an/2 - 10, alto_an/2 - 10);
var factor_ex = 2;
var vel_ex = 0;
var offset_ex = 0;
var azul_ex = 0;
var verde_ex = 0;
var marcas_ex = document.getElementById("marcas").value;
var d_ex = 1/marcas_ex;
function cardioide_explicacion(){
    ctx_ex.clearRect(0,0,ancho_ex, alto_ex);
    ctx_ex.lineWidth = 2;
    circulo(ctx_ex, factor_ex, offset_ex, ancho_ex, alto_ex, radio_ex, azul_ex, verde_ex);
    cardioide(ctx_ex, factor_ex, d_ex, offset_ex, ancho_ex, alto_ex, radio_ex, azul_ex, verde_ex);
    marcar(ctx_ex, d_ex, offset_ex, alto_ex, alto_ex, radio_ex);
	enumerar(ctx_ex, d_ex, ancho_ex, alto_ex, radio_ex);
	marcas_ex = document.getElementById("marcas").value;
	d_ex = 1 / marcas_ex;
}

function animar(){
    cardioide_animacion();
    cardioide_explicacion();
    requestAnimationFrame(animar);
}

animar();


