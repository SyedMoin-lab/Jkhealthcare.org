export interface AICallFormData {
  firstName?: string;
  lastName?: string;
  phone: string;
  location?: string;
}

export async function triggerAICall(formData: AICallFormData) {
  if (!formData?.phone) {
    throw new Error("Missing phone number for AI call");
  }

  const numericPhone = formData.phone.replace(/\D/g, "");
  const formattedPhone = numericPhone.startsWith("91")
    ? `+${numericPhone}`
    : numericPhone.startsWith("0")
      ? `+91${numericPhone.slice(1)}`
      : `+91${numericPhone}`;

  const response = await fetch("/api/ai-call", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      phone: formattedPhone,
    }),
  });

  if (!response.ok) {
    try {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse?.error ?? `Failed to trigger AI call (status ${response.status})`,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to trigger AI call (status ${response.status})`);
    }
  }

  return response.json();
}

export function createAICallFormSubmitHandler(
  closeModal?: () => void,
  logMessage = "Form submitted",
) {
  return async (formData: AICallFormData) => {
    console.log(`${logMessage}:`, formData);

    try {
      const data = await triggerAICall(formData);
      console.log("API response:", data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error during API call:", error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong while submitting the form.";
      alert(message);
    } finally {
      closeModal?.();
    }
  };
}
