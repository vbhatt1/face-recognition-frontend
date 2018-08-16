import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imagelink,box}) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id="face" src={imagelink} alt="Face detection" width="400px" height="auto"/>
				<div className="bounding-box" 
				style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>
			</div>
		</div>
	);
};

export default FaceRecognition;