import { useEventForm } from "../../../hooks/events/useEventForm.ts";
import {
  eventFieldsConfig,
  eventTypeMap,
  type EventItem,
  type IField,
} from "../../../types/events";
import * as S from "../../../styles/login.style";

export const FormSection = ({ data }: { data?: EventItem }) => {
  const {
    formData,
    handleChange,
    handleSkillsChange,
    handleSubmit,
    handleDelete,
    isSubmit,
    isDelete,
  } = useEventForm(data);

  const fields = eventFieldsConfig[formData.eventType] || [];

  const renderField = (field: IField) => {
    const props = {
      name: field.name,
      onChange: field.type === "skills" ? handleSkillsChange : handleChange,
      value:
        field.type === "skills"
          ? (formData.hardSkills || []).join(", ")
          : (formData[field.name]?.toString() ?? ""),
      valEmpty: formData[field.name] != null,
    };

    switch (field.type) {
      case "textarea":
        return <S.Textarea {...props} />;
      case "datetime-local":
        return <S.Input type="datetime-local" {...props} />;
      case "skills":
        return <S.Input type="text" {...props} />;
      default:
        return <S.Input type="text" {...props} />;
    }
  };

  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // paddingBottom: "151px",
        marginTop: "80px",
      }}
      onSubmit={handleSubmit}
    >
      <S.ImageContainer>
        <S.Image></S.Image>
        <S.Image></S.Image>
        <S.Image></S.Image>
        <S.Image></S.Image>
      </S.ImageContainer>
      <div style={{ width: "100%", maxWidth: "1120px" }}>
        <S.InputWrapper>
          <S.Label>Тип события</S.Label>
          <S.Select
            valEmpty={formData.eventType != null}
            event={true}
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
          >
            {Object.entries(eventTypeMap).map(([key, label]) => (
              <option key={key} value={Number(key)}>
                {label}
              </option>
            ))}
          </S.Select>
        </S.InputWrapper>

        {fields.map((field) => (
          <S.InputWrapper key={field.name}>
            <S.Label>{field.label}</S.Label>
            {renderField(field)}
          </S.InputWrapper>
        ))}

        <S.SubmitButton
          event={true}
          type="submit"
          disabled={isSubmit || isDelete}
        >
          {isSubmit ? "Сохранение..." : "Сохранить"}
        </S.SubmitButton>
        {/* {data?.id && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmit || isDelete}
            >
              {isDelete ? "Удаление..." : "Удалить"}
            </button>
          )} */}
      </div>
    </form>
  );
};
