import { useRef, useState, useCallback, useEffect, useMemo } from "react";

import {useDispatch, useSelector} from "react-redux";

import { motion, animationControls } from "framer-motion";

import { useSpring, useChain, animated } from 'react-spring';

import MonitoringTableContainer from "./MonitoringTableContainer";
import TabOptions from "./TabOptions";

import { loadUnpaidBookings, loadImminentDepartures, loadRecentArrivals, loadBestRatedOwners, loadProperties, generateDataForTest} from "../../../actions/monitoring";

import { createUseStyles } from "react-jss";

import Star from "../../../public/images/ratings/filled-star.png";

import MonitoringModal from "../MonitoringModal";

const text = 'Sometext';

import { getCurrentUser, getIsMonitoringModalOpen, getSelectedProperty } from "../../../store";

import CollapsibleContainer from "../../animationsInProgress/CollapsibleContainer";

const useStyles = createUseStyles((theme) => ({
	root: {
		marginTop: 200,
	},
	text: {
		color: "white",
		zIndex: 14,
		position: "absolute",
		top: 50,
		left: 0,
	},
	starImage: {
		position: "absolute",
		top: 0,
		left: 0,
		// '&:after': {  /** Yes it did work !!! **/
		// 	content: '"\\sometext"', /** yes this is peculiar but it is the only way it seems to work */
		// 	display: 'inline-block',
		// 	position: 'absolute',
		// 	top: 0,
		// 	left: 0,
		// 	minHeight: 20,
		// 	color: "white",
		// },
		'& > img': {
			width: 100,
			height: 100,
			cursor: 'pointer',
			'&::hover': {
				transform: 'scale(1.2)',
			}
		},
	},
	starAndImage: {
		position: 'relative',
		'& > img': {
			width: 100,
			height: 100,
			position: 'absolute',
			top: 0,
			left: 0,
			cursor: 'pointer',
		},
		'& > span': {
			position: 'absolute',
			fontSize: 9,
			color: "white",
			top: 50,
			left: 35,
		}
	},
	infoText: {
		color: "white",
		//  position: 'absolute',
		//  top: 10,
		//  left: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 100,
	},
	animationFlex: {
		display: 'flex',
	},
	animationsContainerForTest: {
		position: 'relative',
		border: "2px red solid",
		height: 'fit-content',
		width: '100%',
	},
	animationSpring: {

	},
	buttonForTest: {
		width: 100,
		height: 40,
	}
}));

import {
	monitoringGridStyle,
	monitoringFilterOptionsArea,
	monitoringTableArea,
	monitoringMapArea,
} from "./monitoring.css";
import { Calendar } from "react-calendar";

const AdminMonitoring = () => {
	const [selectedTab, setSelectedTab] = useState(0);

	const [defaultFilters, setDefaultFilters] = useState(null);   /** the filters should depend too on the selected tab */
	const [headers, setHeaders] = useState([]);
	const [data, setData] = useState([]);

	const [tableName, setTableName] = useState('');

	const [usedText, setUsedText] = useState("");

	const isModalOpen = useSelector(getIsMonitoringModalOpen);

	const selectedProperty = useSelector(getSelectedProperty)

	const [isCollapsibleContentShown, setIsCollapsibleContentShown] = useState(false);

	// Modal
	// const [isModalOpen, setIsModalOpen] = false;

	// const correlationTable = [
	// 	{index: 0, function: loadUnpaidBookings, headers: ['user', 'home', 'proprietary']},
	// 	{index: 1, function: loadBestRatedOwners, headers: ['user', 'home', 'proprietary']},
	// 	{index: 2, function: loadRecentArrivals, headers: ['user', 'home', 'proprietary']},
	// 	{index: 3, function: loadImminentDepartures, headers: ['user', 'home', 'proprietary']},  // il faudrait un champ expectedFormat pour le coup
	// ]

	const labelTable = [
		/** properties */
		{ id: "isBooked", label: "Actuellement réservé" },
		{ id: "bookedSpan", label: "Réservation (en cours ou prochaine" },
		{ id: "user", label: 'Propriétaire' },
		{ id: 'address', label: 'Addresse' },
		{ id: "isMainHousing", label: 'Propriété principale' },
		{ id: "housingCapacity", label: "Capacité d'accueil" },
		/** bookings and it's there that I should do an aggregation pipeline ... **/
	];

	const tableNameIndex = ['properties', "users", 'recentArrivals', "imminentDepartures"];

	const getContent = () => {
		switch (selectedTab) {
			case 0:
				return <div></div>
			case 1:
				return <div></div>
			case 2:
				return <div></div>
			case 3:
				return <div></div>
		}
	};


	const _setDefaultTabContent = () => {
		let automaticHeaders, automaticFilters;
		switch (selectedTab) {
			/** etc */
		}
	}

	// const bogusData = [{id: '453', owner: "someDude", user: 'someOtherDude', }]
	const _loadData = async (...rest) => {
		// Yes I can use rest ici pour le coup ça va être grave marrant ... 
		/** faut les rajouter là les filtres par défaut sinon ça va pas marcher */


		// ici rajouter les filtres par défaut, pourquoi tant de fonctions asynchrones pour le coup ça me dépasse totalement ... 
		let _loadingFunction = () => { };
		switch (selectedTab) {
			case 0:
				_loadingFunction = async () => await loadProperties(...rest);
				break;
			case 1:
				_loadingFunction = async (...rest) => await loadBestRatedOwners(...rest);
				break;
			case 2:
				_loadingFunction = async (...rest) => await loadRecentArrivals(...rest);
				break;
			case 3:
				_loadingFunction = async (...rest) => await loadImminentDepartures(...rest);
				break;
			default:
				_loadingFunction = async () => { };
				break;
		}
		/** execute each function */
		const results = await _loadingFunction(...rest);

		/** set table information (results and headers and table names) */
		setTableName(tableNameIndex[selectedTab])


		if (!results || Array.isArray(results)) {
			setData([]);
			setHeaders([]);
		}
		if (!!results && Array.isArray(results)) {
			setData(results);
			if (results.length) {
				const formattedHeaders = Object.keys(results[0]).map((header) => labelTable.find((label) => label.id === header));
				setHeaders(formattedHeaders);
			}
			else setHeaders([]);
		}
	}



	useMemo(() => {
		_loadData();
	}, [selectedTab])

	const classes = useStyles();


	// -------------------- ANIMATION -------------------------//
	// ------------------- TEXT DIV  -------------------------//
	const textInitial = { transform: 'scale(1)', left: 'calc(50% - 10px)' };
	const textAnimate = { transform: 'scale(0.8)', left: "40px" };
	const textTransition = { transform: { delay: 2.5, duration: 0.5, ease: "easeInOut" }, left: { delay: 3, duration: 0.5, ease: "easeInOut" } };
	// -------------------- STAR ------------------------------//
	const starInitial = { opacity: 0, left: 'calc(50% - 50px)' };
	const starAnimate = { opacity: 1, left: 0 };
	const starTransition = { opacity: { delay: 2, duration: 0.5, ease: "easeInOut" }, left: { delay: 3, duration: 0.5, ease: "easeInOut" } };
	// ----------------- INFORMATION TEXT ------------------------//
	const infoTextInitial = { opacity: 0, paddingTop: "0px" };
	const infoTextAnimate = { opacity: 1, paddingTop: "15px" };
	const infoTextTransition = { opacity: { delay: 3.5, duration: 0.5, ease: "easeInOut" }, paddingTop: { delay: 4, duration: 0.5, ease: "easeInOut" } };

	const user = useSelector(getCurrentUser);

	const _generateDataForTest = async () => {
		return await generateDataForTest(user);
	}



	return (
		<div className={classes.root}>
			<div className={monitoringGridStyle}>
				{/* here add something to select a shipping day*/}
				<button onClick={_generateDataForTest}>Cliquer pour générer des faux bookings</button>
				<TabOptions
					className={monitoringFilterOptionsArea}
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>
				<MonitoringTableContainer
					className={monitoringTableArea}
					defaultFilters={[]}
					reloadData={_loadData}
					headers={headers}
					data={data}
					name={tableName} />
				<div className={monitoringMapArea}>
					<div className={classes.animationflex}>
						<div className={classes.animationsContainerForTest}>
							<motion.div initial={textInitial} animate={textAnimate} transition={textTransition} className={classes.text}>1/2</motion.div>
							<motion.div initial={starInitial} animate={starAnimate} transition={starTransition} className={classes.starImage}>
								<div className={classes.starAndImage}>
									<img src={Star} alt='star-test' />
								</div>
							</motion.div>
						</div>
						<motion.div className={classes.infoText} initial={infoTextInitial} animate={infoTextAnimate} transition={infoTextTransition} onAnimationComplete={() => setIsCollapsibleContentShown(true)}><span>Il ne vous reste plus que quelques jours pour ...</span></motion.div>
						<div className={classes.infoText} ><CollapsibleContainer isVisible={isCollapsibleContentShown} /></div>
					</div>
				</div>
			</div>
			<MonitoringModal isVisible={!!isModalOpen} name={tableName} />
		</div>
	);
};

export default AdminMonitoring;
