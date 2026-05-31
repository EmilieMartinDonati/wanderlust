import React from "react";
import {
  formStyle,
  fieldArrayClassName,
  eachMediaClassName,
  innerEachMedia,
} from "./ratingForm.css";
import WrappedFormField from "../../commons/WrappedFormField";
import Button from "../../commons/Button";
import { FieldArray, Field } from "formik";

import MediaFieldArray from "./MediaFieldArray";
import MotionText from "../../commons/MotionText";

import { createUseStyles } from "react-jss";
import classNames from "classnames";

const useStyles = createUseStyles((theme) => {});

const RatingForm = (props) => {
  const {
    setFieldValue,
    values,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    handleChange,
    idForm,
  } = props;

  /** touched only populate on submitting the form which is convenient for displaying errors */

  /** NB :
   * at first I add put both my field array component right here inside this one,
   * it is however to be avoided as it causes rerender and make all the field inside fieldArray lose focus */

  const _onChangeRating = (fieldName, starIndex) => {
    if (!fieldName) return;
    const splitPath =
      fieldName.split(
        "."
      ); /** field name is in two parts, etc ratings.globalRating */
    const currentValue = values[splitPath[0]][splitPath[1]];
    if (currentValue === starIndex + 1) {
      /** for deselection */
      setFieldValue(fieldName, starIndex);
    } else {
      setFieldValue(fieldName, starIndex + 1); /** star index begins at 0 */
    }
  };

  const _onToggleBooleanCheckBox = (fieldName) => {
    const currentValue = values[fieldName];
    setFieldValue(fieldName, !currentValue);
  };

  return (
    <form id={idForm} className={formStyle} onSubmit={handleSubmit}>
      {/* <SwitchItem /> */}
      <MotionText title="Notation" />
      <div className={fieldArrayClassName}>
        <div className={innerEachMedia}>
          <WrappedFormField
            type="stars"
            label="Notation globale"
            name="ratings.globalRating"
            value={values.ratings.globalRating}
            onChange={_onChangeRating}
            errorMessage={
              touched.ratings?.globalRating && errors.ratings?.globalRating
                ? errors.ratings?.globalRating
                : null
            }
            {...props}
          />
        </div>
        <div className={innerEachMedia}>
          <WrappedFormField
            label="Notation de l'accueil"
            name="ratings.receptionRating"
            type="stars"
            value={values.ratings?.receptionRating}
            onChange={_onChangeRating}
            onBlur={handleBlur}
            errorMessage={
              touched.ratings?.receptionRating &&
              errors.ratings?.receptionRating
                ? errors.ratings?.receptionRating
                : null
            }
          />
        </div>
        <div className={innerEachMedia}>
          <WrappedFormField
            label="Notation de l'organisation"
            name="ratings.logisticsRating"
            type="stars"
            value={values.ratings?.logisticsRating}
            onChange={_onChangeRating}
            onBlur={handleBlur}
            errorMessage={
              touched.ratings?.logisticsRating &&
              errors.ratings?.logisticsRating
                ? errors.ratings?.logisticsRating
                : null
            }
          />
        </div>
        <div className={innerEachMedia}>
          <WrappedFormField
            label="Notation du cadre"
            name="ratings.locationRating"
            type="stars"
            value={values.ratings?.locationRating}
            onChange={_onChangeRating}
            onBlur={handleBlur}
            errorMessage={
              touched.ratings?.locationRating && errors.ratings?.locationRating
                ? errors.ratings?.locationRating
                : null
            }
          />
        </div>
        <div className={innerEachMedia}>
          <WrappedFormField
            label="Notation du travail et des activités proposées"
            name="ratings.activitiesRating"
            type="stars"
            value={values.ratings?.activitiesRating}
            onChange={_onChangeRating}
            onBlur={handleBlur}
            errorMessage={
              touched.ratings?.activitiesRating &&
              errors.ratings?.activitiesRating
                ? errors.ratings?.activitiesRating
                : null
            }
          />
        </div>
        <div className={innerEachMedia}>
					<div style={{alignSelf: 'end'}}>
          <WrappedFormField
            onChange={_onToggleBooleanCheckBox}
            name="sendDataToAnalytics"
            label="J'accepte que mon avis soit conservé et analysé"
            value={values.sendDataToAnalytics}
						type='customCheckbox'
          />
					</div>
        </div>
      </div>
      <MotionText title="Médias" />
      <FieldArray
        name="medias"
        render={(arrayHelpers) => {
          return <MediaFieldArray {...arrayHelpers} />;
        }}
      />
      <Button type='submit' title="Soumettre" />
    </form>
  );
};

export default RatingForm;
