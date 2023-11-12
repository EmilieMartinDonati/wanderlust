import React from 'react';
import { useSelector } from 'react-redux'
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { formContainerStyle } from './createListingForm.css';
import { validateAddress } from '../../actions/addresses';
import WrappedFormField from '../commons/WrappedFormField';
import PropertiesFieldArrayForListing from './PropertiesFieldArrayForListing';
import { skillsWithLabel } from '../../bogusData/skills';
import { createNewListing } from '../../actions/listings';
import { createProperties } from '../../actions/properties';
import { getCurrentUser } from '../../store';

const CreateListingContainer = () => {


  const user = useSelector(getCurrentUser)

  const initialValues = {
    properties: [],
    description: '',
    // skills: []
  }

  const validationSchema = Yup.object().shape({
    description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Champ requis'),
    properties: Yup.array().of(Yup.object().shape({
      address:
        Yup.string()
          .test(
            "adresse vérifiée",
            "adresse non vérifiée",
            async (value) => {
              const reformattedValues = {
                address: value
              };
              const verified = await validateAddress({ values: reformattedValues });
              return verified;
            }
          ),
      housingCapacity: Yup.number().required('Required'),
      rooms: Yup.array().of(Yup.object().shape({
        capacity: Yup.number(),
        strangerFriendly: Yup.boolean()
      }))
    }))
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { properties, skills } = values;
        const propertiesAddedOnTheFly = properties.filter(property => !!property.createdOnTheFly);
        const propertiesNotAddedOnTheFly = properties.filter(property => !property.createdOnTheFly);
        properties.forEach((property) => delete property.createdOnTheFly)
        values.properties = properties
        values.skills = [skills]
        let errorOnCreateProperty = false, newProperties = [];

        // CREATE NEW PROPERTIES IF ANY
        if (propertiesAddedOnTheFly.length) {
          const result = await createProperties({ properties: propertiesAddedOnTheFly, user })
          const { data, error } = result;
          newProperties = data;
          errorOnCreateProperty = error;
        }
        if (!!errorOnCreateProperty) {
          console.log('An error has occurred on creating properties')
        }
        // CREATE LISTING
        if (!errorOnCreateProperty) {
          const allCreatedProperties = [...propertiesNotAddedOnTheFly, ...newProperties];
          const formattedListingValues = { ...values };
          formattedListingValues.properties = allCreatedProperties.map((property) => property._id);
          const { error } = await createNewListing({ listingValues: formattedListingValues, user });
          if (!error) setSubmitting(false)
          if (error) {
            console.log('an error has occurred on submitting listing')
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => {
        return (
          <form onSubmit={handleSubmit} className={formContainerStyle}>
            <WrappedFormField
              label='Description'
              type="text"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              errorMessage={!!errors.description && !!touched.description && errors.description}
            />
            <FieldArray
              name="properties"
              render={(arrayHelpers) => {
                return <PropertiesFieldArrayForListing {...arrayHelpers} />;
              }}
            />
            {errors.properties && touched.properties && errors.properties}
            <div>
              <WrappedFormField
                label='Talents recherchés'
                name='skills'
                type='select'
                options={skillsWithLabel}
                errorMessage={!!errors.skills && !!touched.skills && errors.skills}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Valider mon annonce
            </button>
          </form>
        )
      }}
    </Formik>
  )
}

export default CreateListingContainer;