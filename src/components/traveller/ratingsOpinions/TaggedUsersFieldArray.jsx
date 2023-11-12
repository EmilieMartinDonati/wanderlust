import WrappedFormField from "../../commons/WrappedFormField";
import { Field, FieldArray } from "formik";
import Button from "../../commons/Button";

const TAGGING_ACCEPTANCE_OPTIONS = [{ id: true, label: 'Faux' }, { id: true, label: 'Vrai' }];

const TaggedUsersFieldArray = ({ i, ...props}) => {

  const { remove, push } = props;
  const  {handleChange, values } = props?.form;

  return  (
    <div>
      <button
        type="button"
        onClick={() =>
          push({
            username: "Lola",
            name: "",
            hasAcceptedToBeTagged: false,
          })
        }
      >
        +
      </button>
      <span>Ajouter des utilisateurs à taguer dans la photo</span>
      {values.medias[i].taggedUsers &&
        values.medias[i].taggedUsers.length > 0 &&
        values.medias[i].taggedUsers.map((user, userIndex) => {
          return (
          <div key={userIndex}>
            <WrappedFormField
              label={"Email"}
              name={`medias.${i}.taggedUsers.${userIndex}.username`}
              type="text"
              onChange={handleChange}
              value={values.medias[i].taggedUsers[userIndex].username}
            />
            <WrappedFormField
              label="Nom"
              name={`medias.${i}.taggedUsers.${userIndex}.name`}
              type="text"
              onChange={handleChange}
              value={values.medias[i].taggedUsers[userIndex].name}
            />
            <WrappedFormField
              label="A accepté d'être tagué"
              name={`medias.${i}.taggedUsers.${userIndex}.hasAcceptedToBeTagged`}
              type="checkbox"
              options={TAGGING_ACCEPTANCE_OPTIONS}
              onChange={handleChange}
              value={
                values.medias[i].taggedUsers[userIndex].hasAcceptedToBeTagged
              }
            />
            <Button
              mode="delete"
              title="Ôter"
              onClick={() => remove(userIndex)}
            ></Button>
          </div>
        )})}
    </div>
  );

}

export default TaggedUsersFieldArray;