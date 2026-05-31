import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { sendRatingForm, verifyTaggedUser } from "../../../actions/opinions";
import RatingForm from "./RatingForm";
import { formContainerStyle } from "./ratingForm.css";

const SomeFormContainer = () => {
  /** beware that fieldArray doesn't work with useFormik which doesn't subscribe to the context
   * there are also gotchas from validation with fieldArray - see official doc.
   */

  const notationNumberErrorMin = "Veuillez donner au moins une étoile";
  const notationNumberErrorMax =
    "Vous ne pouvez pas donner plus de cinq étoiles";

  const userId = "456456";

  const initValues = {
    ratings: {
      globalRating: 1,
      receptionRating: 1,
      logisticsRating: 1,
      activitiesRating: 1,
      locationRating: 1,
    },
    medias: [
      { comment: "", taggedUsers: [] }
    ],
    sendDataToAnalytics: true,
  };

  const formSchema = yup.object().shape({
    sendDataToAnalytics: yup.bool().required(),
    ratings: yup.object().shape({
      globalRating: yup
        .number()
        .min(1, notationNumberErrorMin)
        .max(5, notationNumberErrorMax),
      receptionRating: yup
        .number()
        .min(1, notationNumberErrorMin)
        .max(5, notationNumberErrorMax),
      logisticsRating: yup
        .number()
        .min(1, notationNumberErrorMin)
        .max(5, notationNumberErrorMax),
      activitiesRating: yup
        .number()
        .min(1, notationNumberErrorMin)
        .max(5, notationNumberErrorMax),
      locationRating: yup
        .number()
        .min(1, notationNumberErrorMin)
        .max(5, notationNumberErrorMax),
    }),
    medias: yup
      .array()
      .of(
        yup.object().shape({
          content: yup.object(),
          comment: yup
            .string().trim()
            .max(1000, "Votre commentaire ne doit pas excéder 1000 caractères"),
          taggedUsers: yup.array().of(
            yup
              .object()
              .shape({
                username: yup.string().trim(), /**.matches(REGEX_EMAIL, 'i') */
                name: yup.string().trim(),
                hasAcceptedToBeTagged: yup.bool().required("Champ requis"),
              })
              .test(
                "user ok",
                "user not ok",
                async (value) => await verifyTaggedUser(value, userId)
              )
          ),
        })
      )
      .min(1, "Taguez au moins un autre utilisateur"),
  });

  return (
    <div className={formContainerStyle}>
      <h3>Noter et documenter votre voyage</h3>
      <Formik
        initialValues={initValues}
        validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          sendRatingForm(values);
          // resetForm();
        }}
        children={(props) => <RatingForm {...props} />}
      />
    </div>
  );
};

export default SomeFormContainer;
