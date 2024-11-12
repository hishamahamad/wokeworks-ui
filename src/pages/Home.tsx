import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import WokeWorksLogo from '../assets/logo.svg?react';

import './Home.css';

export const Home = (): FunctionComponent => {
	const { t, /* i18n */ } = useTranslation();
	const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
	const videoRef = useRef<HTMLVideoElement>(null);

	const videos = [
		{ src: 'globe.mp4', title: t('home.title.digitalTransformation') },
		{ src: 'street.mp4', title: t('home.title.growthCatalyst') },
		{ src: 'coding.mp4', title: t('home.title.experienceArchitect') },
	];

	// When video ends, move to the next video
	const handleVideoEnd = (): void => {
		setCurrentVideoIndex((previousIndex) => (previousIndex + 1) % videos.length);
	};

	// Play the video when index changes
	useEffect(() => {
		const loadAndPlayVideo = async (): Promise<void> => {
			if (videoRef.current) {
				try {
					videoRef.current.load();
					await videoRef.current.play();
				} catch (error) {
					console.error("Error playing video:", error);
				}
			}
		};

		void loadAndPlayVideo();
	}, [currentVideoIndex]);

	// const onTranslateButtonClick = async (): Promise<void> => {
	// 	if (i18n.resolvedLanguage === "en") {
	// 		await i18n.changeLanguage("es");
	// 	} else {
	// 		await i18n.changeLanguage("en");
	// 	}
	// };

	return (
		<div className="font-bold w-screen h-screen flex flex-col justify-center items-center relative">
			<div className="absolute top-8 left-6 z-10">
				<WokeWorksLogo height="29" width="189"/>
			</div>

			<section className="video-container">
				<video
					ref={videoRef}
					autoPlay
					muted
					className="object-cover w-full h-screen"
					src={videos[currentVideoIndex]?.src}
					onEnded={handleVideoEnd}
				/>
				<h1 className="text-white z-10 absolute bottom-40 w-full text-center leading-none capitalize">
					<TypeAnimation
						key={currentVideoIndex}
						omitDeletionAnimation
						cursor={false}
						repeat={Infinity}
						sequence={[videos[currentVideoIndex] ? videos[currentVideoIndex].title : '', 5000, '']}
						speed={50}
					/>
				</h1>
			</section>
		</div>
	);
};
