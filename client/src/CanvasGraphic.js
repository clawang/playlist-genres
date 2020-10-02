import React, {useEffect, useState} from 'react';
import Vibrant from 'node-vibrant';

function CanvasGraphic(props) {
  const [appState, setAppState] = useState({
    palette: {}
  });

  const getColor = () => {
  	let src = '';
  	if(props.tracks) {
		src = props.artists[0].images[0].url || '';
	}
  	Vibrant.from(src).getPalette(function(err, palette) {
		if(palette) {
			console.log(palette);
			setAppState({palette: palette});
			drawCanvas(palette);
		}
	});
  }

  const drawCanvas = (palette) => {
  	let c = document.getElementById("downloadable");
  	c.width = c.clientWidth * 2
	c.height = c.clientHeight * 2
  	let ctx = c.getContext("2d");
  	ctx.scale(2, 2);

  	if(palette.DarkMuted) {
  		const bgColor = palette.DarkMuted.getRgb();
		ctx.fillStyle = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')';
	} else {
		ctx.fillStyle = 'rgb(0,0,0)';
	}
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.font = "16px 'Circular Spotify Tx T Black'";

  	if(palette.Vibrant) {
  		const bgColor = palette.Vibrant.getRgb();
		ctx.fillStyle = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')';
	} else {
		ctx.fillStyle = 'rgb(226,28,164)';
	}
	ctx.fillText('QUARANTINE WRAPPED', 270, 50);
  	ctx.fillRect(30, 43, 230, 3);

  	const image = new Image();
  	if(props.tracks) {
		image.src = props.artists[0].images[0].url || '';
	}
	image.onload = () => {
		ctx.drawImage(image, 290, 90, 140, 130);
		ctx.drawImage(image, 280, 115, 160, 145);
		ctx.drawImage(image, 270, 140, 180, 170);
		ctx.drawImage(image, 250, 170, 220, 210);
	};

	if(palette.LightVibrant) {
  		const bgColor = palette.LightVibrant.getRgb();
		ctx.fillStyle = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')';
	} else {
		ctx.fillStyle = 'rgb(209,255,106)';
	}

	ctx.font = "18px 'Circular Spotify Tx T Black'";
	ctx.fillText('TOP ARTISTS', 30, 106);
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.font = "20px 'Circular Spotify Tx T Black'";

	for(let i = 0; i < 5; i++) {
		if(props.artists[i] && Object.keys(props.artists[i]).length != 0) {
			let name = props.artists[i].name;
			console.log(props.artists[i]);
			if(name.length > 19) {
				name = name.substring(0, 19).concat('..');
			}
			writeText(ctx, name, 30, 133 + i * 28);
		}
	}

	if(palette.LightVibrant) {
  		const bgColor = palette.LightVibrant.getRgb();
		ctx.fillStyle = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')';
	} else {
		ctx.fillStyle = 'rgb(209,255,106)';
	}

	ctx.font = "18px 'Circular Spotify Tx T Black'";
	writeText(ctx, 'TOP SONGS', 30, 320);
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.font = "20px 'Circular Spotify Tx T Black'";

	for(let i = 0; i < 5; i++) {
		if(props.tracks[i]) {
			let name = props.tracks[i].name;
			if(name.length > 19) {
				name = name.substring(0, 19).concat('..');
			}
			writeText(ctx, name, 30, 348 + i * 28);
		}
	}

	if(palette.LightVibrant) {
  		const bgColor = palette.LightVibrant.getRgb();
		ctx.fillStyle = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')';
	} else {
		ctx.fillStyle = 'rgb(209,255,106)';
	}
	ctx.font = "18px 'Circular Spotify Tx T Black'";
	writeText(ctx, 'TOP GENRE', 250, 430);
	ctx.fillStyle = 'rgb(255,255,255)';
	ctx.font = "24px 'Circular Spotify Tx T Black'";
	if(props.genres && props.genres[0][0]) {
		let g = props.genres[0][0];
		let topGenre = g.charAt(0).toUpperCase() + g.slice(1);
		writeText(ctx, topGenre, 250, 460);
	}

	if(palette.DarkVibrant) {
  		const bgColor = palette.DarkVibrant.getRgb();
		ctx.fillStyle = 'rgba(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ', 50)';
	} else {
		ctx.fillStyle = 'rgb(255,255,255,50)';
	}
	ctx.font = "12px 'Circular Spotify Tx T Black'";
	writeText(ctx, 'bit.ly/quarantine-wrapped', 305, 66);
  }

  const writeText = (ctx, words, x, y) => {
  	ctx.fillText(words, x, y);
  }

  const dlCanvas = () => {
  	let canvas = document.getElementById("downloadable");
	let dt = canvas.toDataURL('image/png');
	/* Change MIME type to trick the browser to downlaod the file instead of displaying it */
	dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

	/* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
	dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

	this.href = dt;
  }

  useEffect(() => {
    console.log(props.finished);
    if(props.finished >= 3) {
    	getColor();
    }
  }, [props.finished]);

  return (
    <div className='canvas-graphic-wrapper'>
	    <div className='canvas-graphic'>
	    	<div className='canvas-title'>
	    		<h1>Share with the world.</h1>
	    		<h3>Or hide it away forever.</h3>
	    		<h3>Your choice, really.</h3>
	    		<button onClick={dlCanvas} style={{marginTop: '2em'}}>Download</button>
	    	</div>
	      <canvas id='downloadable' width='500' height='500'></canvas>
      </div>
    </div>
  )
}

export default CanvasGraphic;
