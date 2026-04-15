/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormValues, EventItem } from "../../types/events";
import { useCreateEvent } from "./useCreateEvent";
import { useChangeEvent } from "./useChangeEvent";
import { useDeleteEvent } from "./useDeleteEvent";

const defaultValues: FormValues = {
  title: "",
  description: "",
  eventType: 0,
  startDate: "",
  endDate: "",
  organization: "",
  hardSkills: [],
  position: "",
};

export const useEventForm = (initialData?: EventItem) => {
  const navigate = useNavigate();
  const createMutation = useCreateEvent();
  const updateMutation = useChangeEvent();
  const deleteMutation = useDeleteEvent();

  const [formData, setFormData] = useState<FormValues>(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      return rest;
    }
    return defaultValues;
  });

  const isSubmit = createMutation.isPending || updateMutation.isPending;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, hardSkills: skills }));
  };

  const valDate = (data: FormValues) => ({
    ...data,
    eventType: Number(data.eventType),
    startDate: data.startDate ? new Date(data.startDate).toISOString() : "",
    endDate: data.endDate ? new Date(data.endDate).toISOString() : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        const payload = valDate(formData);
        const eventToUpdate: EventItem = { ...payload, id: initialData.id };
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: eventToUpdate,
        });
      } else {
        const payload = valDate(formData);
        await createMutation.mutateAsync(payload);
      }
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    navigate(-1);
  };

  const handleDelete = async () => {
    if (initialData?.id) {
      await deleteMutation.mutateAsync(initialData.id);
      navigate(-1);
    }
  };

  return {
    formData,
    handleChange,
    handleSkillsChange,
    handleSubmit,
    handleDelete,
    isSubmit,
    isDelete: deleteMutation.isPending,
  };
};
