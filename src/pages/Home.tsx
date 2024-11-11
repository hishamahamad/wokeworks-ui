import type { FunctionComponent } from "../common/types";
import WokeWorksLogo from '../assets/logo.svg?react';
import './Home.css';

export const Home = (): FunctionComponent => {

	return (
		<div className="font-bold w-screen h-screen flex flex-col justify-center items-center relative">
			<div className="absolute top-8 left-4 z-10">
				<WokeWorksLogo height="29" width="189"/>
			</div>

			<section className="video-container">
				<video autoPlay loop muted className="object-cover w-full h-screen">
					<source src="intro.mp4" type="video/mp4"/>
				</video>
				<h1 className="text-white z-10 absolute bottom-40 w-full text-center">
					Your digital transformation partner.
				</h1>
			</section>
		</div>
	);
};
