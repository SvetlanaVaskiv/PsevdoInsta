import React, { Component } from "react";
import Slider from "react-slick";
import { Slide, SlyderStyle } from "./LogInStyle";
import family1 from '../../images/family1.jpg';
import family2 from '../../images/family2.jpg';
import family3 from '../../images/family3.jpg';



export const AutoPlay = () => {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 5000,
		cssEase: "linear"
	};
	return (
		<Slide>
			<Slider {...settings}>
				<Slide>
					<SlyderStyle
						src={family1}
						width='400'
					/>				</Slide>
				<Slide>
					<SlyderStyle
						src={family2}
						width='400'
					/>				</Slide>
				<Slide>
					<SlyderStyle
						src={family3}
						width='400'
					/>				</Slide>

			</Slider>
		</Slide>
	);
}
