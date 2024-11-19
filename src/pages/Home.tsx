import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";

import type { FunctionComponent } from "../common/types";
import WokeWorksLogoWhite from '../assets/logo-white.svg?react';
import WokeWorksLogoBlack from '../assets/logo-black.svg?react';

export const Home = (): FunctionComponent => {
	const { t, /* i18n */ } = useTranslation();
	const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
	const [isDarkBackground, setIsDarkBackground] = useState(true);
	const [hasStartedTypingAboutUs, setHasStartedTypingAboutUs] = useState(false);
	const [aboutUsDescription, setAboutUsDescription] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null);
	const logoRef = useRef<HTMLDivElement>(null); // Reference to the logo
	const sectionsRef = useRef<Array<HTMLDivElement>>([]);

	const videos = [
		{ src: 'globe.mp4', title: t('home.hero.digitalTransformation') },
		{ src: 'street.mp4', title: t('home.hero.growthCatalyst') },
		{ src: 'coding.mp4', title: t('home.hero.experienceArchitect') },
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

	// Observe background changes to toggle logo color
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const section = entry.target as HTMLElement;
					const isWhite = section.classList.contains('bg-white');
					if (entry.isIntersecting) {
						setIsDarkBackground(!isWhite);
						// Trigger typing animation only the first time we enter the section
						if (section.id === 'about-us' && !hasStartedTypingAboutUs) {
							setHasStartedTypingAboutUs(true);
						}
					}
				});
			},
			{ threshold: 0.5 }
		);

		sectionsRef.current.forEach((section) => {
			if (section) observer.observe(section);
		});

		return (): void => {
			observer.disconnect();
		};
	}, [hasStartedTypingAboutUs]);

	// const onTranslateButtonClick = async (): Promise<void> => {
	// 	if (i18n.resolvedLanguage === "en") {
	// 		await i18n.changeLanguage("es");
	// 	} else {
	// 		await i18n.changeLanguage("en");
	// 	}
	// };

	const onEndAboutUs = (): void => {
		setAboutUsDescription(true);
	}

	return (
		<div className="w-screen h-full relative">
			<div ref={logoRef} className="top-8 left-6 z-10 fixed">
				{isDarkBackground ? (
					<WokeWorksLogoWhite height="29" width="189" />
				) : (
					<WokeWorksLogoBlack height="29" width="189" />
				)}
			</div>

			<section
				ref={(element) => (sectionsRef.current[0] = element! as HTMLDivElement)}
				className="relative h-screen bg-black snap-start after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:shadow-video"
			>
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

			<section
				ref={(element) => (sectionsRef.current[1] = element! as HTMLDivElement)}
				className="bg-alizarin h-screen snap-start relative"
				id="about-us"
			>
				<div className="text-white py-28 h-full w-full text-center leading-none flex flex-col justify-between">
					{hasStartedTypingAboutUs && (
						<h2 className="ml-6 mr-6">
							<TypeAnimation
								omitDeletionAnimation
								cursor={false}
								repeat={0}
								sequence={[t('home.aboutUs.title'), 1000, (): void => { onEndAboutUs(); }]}
								speed={50}
							/>
						</h2>
					)}
					{aboutUsDescription && (
						<div className="animate-fadeInUp">
							<h6 className="mb-8">{t('home.aboutUs.ourCompetencies')}</h6>
							<div className="flex flex-wrap justify-between gap-4">
								<h5 className="flex-1 min-w-[45%] p-4 text-right">
									{t('home.aboutUs.ourCompetenciesList.brandingStrategy')}
								</h5>
								<h5 className="flex-1 min-w-[45%] p-4 text-left">
									{t('home.aboutUs.ourCompetenciesList.fullstackDevelopment')}
								</h5>
								<h5 className="flex-1 min-w-[45%] p-4 text-right">
									{t('home.aboutUs.ourCompetenciesList.omnichannelMarketing')}
								</h5>
								<h5 className="flex-1 min-w-[45%] p-4 text-left">
									{t('home.aboutUs.ourCompetenciesList.seo')}
								</h5>
								<h5 className="flex-1 min-w-[45%] p-4 text-right">
									{t('home.aboutUs.ourCompetenciesList.userCentredDesign')}
								</h5>
								<h5 className="flex-1 min-w-[45%] p-4 text-left">
									{t('home.aboutUs.ourCompetenciesList.paidAdvertising')}
								</h5>
							</div>
						</div>
					)}
				</div>
			</section>

			<section
				ref={(element) => (sectionsRef.current[2] = element! as HTMLDivElement)}
				className="bg-carbon h-screen snap-start"
			>

			</section>

			<section
				ref={(element) => (sectionsRef.current[3] = element! as HTMLDivElement)}
				className="bg-alizarin h-screen snap-start"
			>

			</section>

			<section
				ref={(element) => (sectionsRef.current[4] = element! as HTMLDivElement)}
				className="bg-white h-screen snap-start"
			>

			</section>
		</div>
	);
};
