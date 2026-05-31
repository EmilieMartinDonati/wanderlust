import React, { useState, useEffect, Lazy, Suspense } from 'react';

import Button from '../../commons/Button';

import PropTypes from 'prop-types';

import MediaReader from '../../commons/medias/MediaReader';

import {
	fieldArrayClassName,
	eachMediaClassName,
	innerEachMedia,
} from "./ratingForm.css";

import WrappedFormField from '../../commons/WrappedFormField';
import { FieldArray } from 'formik';

import TaggedUsersFieldArray from './TaggedUsersFieldArray';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	buttonRight: {
		alignSelf: 'end',
	},
	thumbnail: {
		height: '400px !important',
	}
}))

const MediaFieldArray = (props) => {

	const { remove, push } = props;

	const { values, handleChange, setFieldValue } = props.form;

	const [loadedFile, setLoadedFile] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);
	const [loadedMediaType, setLoadedMediaType] = useState(null);

	const classes = useStyles();


	const _onUploadMediaPath = (e, fieldPath) => {
		const file = e.currentTarget.files[0];

		if (!file) return;

		console.log('typpppe', file.type.split("/")[0]);
		setLoadedMediaType(file.type.split("/")[0]);
		
		const formattedFile = {
			fileName: file.name,
			type: file.type,
			size: `${file.size} bytes`
		};
		setFieldValue(fieldPath, formattedFile);
		setLoadedFile(file);
	}

	useEffect(() => {
		const _renderFile = () => {
			let reader = new FileReader();
			if (["image", "audio", 'video'].includes(loadedMediaType)) {
			reader.readAsDataURL(loadedFile);
			reader.onload = function () {
				setThumbnail(reader.result);
			};

			reader.onerror = function () {
				console.log(reader.error);
			};
		}
		else {
			reader.readAsArrayBuffer(loadedFile);
			reader.onOnload = function () {
				let buffer = reader.result;
				const chosenType = loadedMediaType === "video" ? "video/mp4" : "audio/mp3";
				let mediaBlob = new Blob([new Uint8Array(buffer)], { type: chosenType });
				let url = window.URL.createObjectURL(mediaBlob);
				setThumbnail(url);
			}

			reader.onerror = function () {
				console.log('READER FILE ERROR', reader.error);
			};
		}
		}
		if (loadedFile) {
			_renderFile();
		}
	}, [loadedFile, loadedMediaType])


	return (
		<>
			<Button
				title="Ajouter un média"
				parentClassName={classes.buttonRight}
				variant='contained'
				onClick={() =>
					push({ type: "", content: "", comment: "", users: [] })
				}
			></Button>
			<div className={fieldArrayClassName}>
				{values.medias &&
					values.medias.length > 0 &&
					values.medias.map((media, index) => (
						<div className={eachMediaClassName} key={index}>
							<div className={innerEachMedia}>
								<WrappedFormField
									label="Uploader un média"
									id='file'
									name={`medias.${index}.content`}
									value={values.medias[index].content}
									type="media"
									onChange={(e) => _onUploadMediaPath(e, `medias.${index}.content`)}
								/>
							</div>
							<div className={innerEachMedia}>
								{thumbnail && loadedMediaType && <MediaReader className={classes.thumbnail} type={loadedMediaType} src={thumbnail} alt='' />}
							</div>
							<div className={innerEachMedia}>
								<WrappedFormField
									label={"Commentaire"}
									name={`medias.${index}.comment`}
									value={values.medias[index].comment}
									type="textArea"
									onChange={handleChange}
								/>
							</div>
							<div className={innerEachMedia}>
								<FieldArray
									name={`medias.${index}.taggedUsers`}
									render={(arrayHelpers) => (
										<TaggedUsersFieldArray
											{...arrayHelpers}
											i={index}
										/>
									)}
								/>
							</div>
							<Button
								mode="delete"
								onClick={() => remove(index)}
							></Button>
						</div>
					))}
			</div>
		</>
	);
};

export default React.memo(MediaFieldArray);

MediaFieldArray.propTypes = {
	renderType: PropTypes.oneOf(["carousel", "horizontal", "vertical"]),
};

