import React from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import path from '../../images/photo.jpeg'

const Animation = () => {
	const FadeInAnimation = keyframes`${fadeIn}`;
	const FadeInDiv = styled.div`
  animation: infinite 5s ${FadeInAnimation};
	height: 400px;
	width: 300px;
	height: 800px;
	position: relative;
	bottom: 12px;
	right: -575px;
	transform: skew(7deg, -7deg);
`;
	return (
		<FadeInDiv>
			<img style={{
				objectFit: 'cover',
				height: '400px'
			}}
				src={path}
				width='800' />
		</FadeInDiv>
	);
}
export default Animation