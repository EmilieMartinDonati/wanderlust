import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray, Controller, useWatch, useController } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { CENTRAL_MODAL_HEADER_HEIGHT } from "../../actions/layout";
import { debounce } from "lodash";
import {
	getAddressAutoComplete,
	validateAddress,
	createNewAddress,
} from "../../actions/addresses";
import { useDebounce } from "../../hooks";
import classNames from "classnames";
import Button from "../commons/Button";

import SliderCarousel from "../commons/SliderCarousel";
import CostumInput from "../commons/forms/reactUseForm/CostumInput";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const propertyTypesOptions = [
	{ id: "flat", label: "Appartement" },
	{ id: "house", label: "Maison" },
];

const useStyles = createUseStyles((theme) => ({
	root: {
		marginTop: CENTRAL_MODAL_HEADER_HEIGHT,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		overflow: "auto",
	},
	scrollablePanelContainer: {
		display: "flex",
		flexDirection: "row",
		maxWidth: "100%",
		overflowX: "scroll",
		"&:-webkit-scrollbar:horizontal": {
			display: "auto",
		},
	},
	p20: {
		padding: [0, 20],
	},
	m20: {
		margin: [0, 20],
	},
	input: {
		composes: "$m20",
		padding: [5, 0],
		border: "none !important",
		outline: "none !important",
		borderRadius: "10px",
		textAlign: "center",
		background: "papayawhip",
		"&:focus, &:active:focus, &:hover, &:disabled": {
			background: "papayawhip",
		},
	},
	error: {
		composes: "$m20",
		fontSize: 12,
		color: "red",
		alignSelf: "end",
	},
	confirmButton: {
		composes: "$m20",
		display: "flex",
		alignSelf: "end",
	},
	eachPanel: {
		composes: "$p20",
		width: "100%",
		minWidth: "100%",
		display: "flex",
		border: "2px solid navy",
		height: "420px",
		flexDirection: "column",
		justifyContent: "center",
		"& :not(:last-child)": {
			marginBottom: 40,
		},
	},
	carouselPanel: {
		"& :not(:last-child)": {
			marginBottom: 0,
		},
	},
	panelTitle: {
		textTransform: "uppercase",
		alignSelf: "start",
	},
	alignedButton: {
		alignSelf: "end",
	},
	inputContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
	},
}));

const AddAddress = () => {
	const [offset, setOffset] = useState(0);
	const [scrollEnabled, setScrollEnabled] = useState(true);

	const classes = useStyles();

	const debounceValidateAddress = debounce(validateAddress, 1000);

	/** -------------------- form validator ------------------------------------
	 * -------------------------------------------------------------------------
	 * -------------------------------------------------------------------------  */

	const initialValues = {
		properties: [{ type: "flat", housingCapacity: 3, photo: "4556" }],
	};

	const formSchema = yup.object().shape({
		zipCode: yup.number().required("Champ requis"), // ajouter un nombre exact pour le coup avec un regex je sais aps moi
		city: yup.string().required("Champ requis"), //
		address: yup
			.string()
			.required("Champ requis")
			.test(
				"adresse vérifiée",
				"adresse non vérifiée",
				async (value, context) => {
					// const verified = await debounceValidateAddress(value);
					const { city, zipCode } =
						context.parent; /** retrieve all other necessary values */
					const reformattedValues = {
						address: value,
						city,
						zipCode,
					};
					const verified = await validateAddress({ values: reformattedValues });
					return verified;
				}
			),
		properties: yup
			.array()
			.of(
				yup.object().shape({
					type: yup.string().oneOf(["flat", "house", "studio", "other"]),
					housingCapacity: yup.number().required("Champ requis"),
					photo: yup.string(),
				})
			)
			.min("1", "Veuillez entrez au moins une propriété"),
	});

	const {
		handleSubmit,
		register,
		getValues,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: initialValues,
	});
	/** -------------------- CUSTOM INPUT  ------------------------------------
	 * -------------------------------------------------------------------------
	 * -------------------------------------------------------------------------  */

	/** --------------------------- SCROLL HANDLER -----------------------------
	 * -------------------------------------------------------------------------
	 * -------------------------------------------------------------------------  */

	const _scrollToNextPanel = (e, step = 0) => {
		// try with scroll into view pour le coup là ...
		// e.stopPropagation();
		const allPanels = document.querySelectorAll(".panel-section");
		const formContainer = document.getElementById("formContainer");
		let panelToInspect = allPanels[step + 1];
		setTimeout(function () {
			window.focus();
			window.scrollTo({
				top: 500,
				left: 1800,
				behavior: "smooth",
			});
		}, 200);
	};

	const _scrollListener = () => {
		// console.log("listening ...");
		let panelinView = 1;
		const formPanel = document.querySelector("#formContainer");
		const allPanels = document.querySelectorAll(".panel-section");
		allPanels.forEach((panel, index) => {
			if (panel.offsetLeft < formPanel.offsetWidth) {
				panelinView = index + 1;
			}
		});
		/** we disable scroll if there are errors in a given panel */
		const groupedErrors = new Map();
		groupedErrors.set(1, [errors.address, errors.city, errors.zipCode]);
		groupedErrors.set(2, null);
		const errorsOnPanelInView = groupedErrors.get(panelinView);
		// console.log("errorsOnPanelInView", errorsOnPanelInView);
		/** c'est pas ça qu'il faut faire, il faut plutôt récupérer le panel précédent */
		if (errorsOnPanelInView.some((error) => !error) && panelinView !== 1) {
			// console.log("scroll back !!!!");
			// scrollTo({ left: 0, behavior: "smooth" });
		}
	};

	useEffect(() => {
		const formPanel = document.querySelector("#formContainer");
		!!formPanel && formPanel.addEventListener("scroll", _scrollListener);

		return () => {
			formPanel.removeEventListener("scroll", _scrollListener);
		};
	}, []);

	const _onFormSubmit = async (data) => {
		await createNewAddress({ values: data });
	};

	const _onChangeAddress = async (e) => {
		// await getAddressAutoComplete({ values: e.target.value });
	};

	const _onError = (errors) => { };

	const { fields, append, remove, swap, prepend } = useFieldArray({
		control,
		name: "properties",
	});

	const locationValues = getValues("address");

	const responsive = {
		0: { items: 1 },
		568: { items: 2 },
		1024: { items: 3 },
	};

	/** --------------------------- CAROUSEL ------------------------------------
	 * -------------------------------------------------------------------------
	 * -------------------------------------------------------------------------  */
	let carouselItems = [];

	const _updateCarouselItems = () => {
		fields.forEach((item, index) => {
			/**
			 * has to be done to forward the ref to another component.
			 * I tried w/ forwardRef and destructuring useRegister to no avail, anything using controller does work.
			 */
			const {
				field: photoField,
				fieldState: { invalid, isTouched, isDirty },
				formState: { touchedFields, dirtyFields }
			} = useController({
				name: `properties.${index}.photo`,
				control,
				rules: { required: true },
			});

			const {
				field: housingCapacityField,
				// fieldState: { invalid, isTouched, isDirty },
				// formState: { touchedFields, dirtyFields }
			} = useController({
				name: `properties.${index}.housingCapacity`,
				control,
				rules: { required: true },
			});

			const element = (
				<div key={item.id}>
					<h4>Demeure numéro {index + 1}</h4>
					<input
						type="text"
						className={classes.input}
						{...register(`properties.${index}.type`)}
					/>
					<CostumInput
					  type='number'
						onChange={housingCapacityField.onChange}
						onBlur={housingCapacityField.onBlur}
						value={housingCapacityField.value}
						name={housingCapacityField.name}
						inputRef={housingCapacityField.ref}
					/>
					<CostumInput
					  type='textarea'
						onChange={photoField.onChange}
						onBlur={photoField.onBlur}
						value={photoField.value}
						name={photoField.name} 
						inputRef={photoField.ref} 
					/>
					<Button
						variant="contained"
						mode="delete"
						parentClassName={classes.alignedButton}
						onClick={() => remove(index)}
					></Button>
				</div>
			);
			carouselItems.push(element);
		});
	};
	_updateCarouselItems();

	const carouselSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToScroll: 1,
		slidesToShow: 1,
		arrows: true,
	};

	return (
		<div className={classes.root}>
			<form
				onSubmit={handleSubmit(_onFormSubmit, _onError)}
				className={classes.form}
				id="formContainer"
			>
				<div className={classes.scrollablePanelContainer}>
					<div className={classNames(classes.eachPanel, "panel-section")}>
						<h4 className={classes.panelTitle}>Ajouter une addresse</h4>
						<input
							className={classes.input}
							type="text"
							name="address"
							id="address"
							{...register("address", {
								onChange: (e) => _onChangeAddress(e),
								onBlur: (e) => { },
							})}
						/>
						{errors.address && (
							<div className={classes.error}>
								Veuillez entrer une adresse valide
							</div>
						)}
						<input
							className={classes.input}
							type="text"
							name="zipCode"
							id="zipCode"
							{...register("zipCode")}
						/>
						{errors.zipCode && (
							<div className={classes.error}>
								Veuillez entrer un code postal valide
							</div>
						)}
						<input
							className={classes.input}
							type="text"
							name="city"
							id="city"
							{...register("city")}
						/>
						{errors.city && (
							<div className={classes.error}>
								Veuillez entrer une ville valide
							</div>
						)}
						<div className={classes.confirmButton}>
							<div
								className={classes.alignedButton}
								onClick={(e) => _scrollToNextPanel(0)}
							>
								Suivant
							</div>
						</div>
					</div>
					<div
						className={classNames(
							classes.eachPanel,
							"panel-section",
							classes.carouselPanel
						)}
					>
						<h4 className={classes.panelTitle}>
							Ajouter une ou des résidences au {locationValues}
						</h4>
						<div>
							<SliderCarousel
								items={carouselItems}
								settings={carouselSettings}
							/>
						</div>
						<Button
							parentClassName={classes.alignedButton}
							title="Ajouter"
							onClick={() => append({ type: "flat", housingCapacity: 3 })}
						></Button>
						<div className={classes.confirmButton}>
							<div
								className={classes.alignedButton}
								onClick={(e) => _scrollToNextPanel(1)}
							>
								Suivant
							</div>
						</div>
					</div>
					<div
						className={classNames(
							classes.eachPanel,
							"panel-section",
							classes.carouselPanel
						)}
					>
						<h4 className={classes.panelTitle}>
							Choisir des talents pour chaque résidence {locationValues}
						</h4>
					</div>
				</div>
				<Button
					type="submit"
					parentClassName={classes.alignedButton}
					title="Soumettre le formulaire"
				></Button>
			</form>
		</div>
	);
};

export default AddAddress;
