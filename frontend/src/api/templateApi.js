const API_URL = "http://localhost:5000/api/templates";

export const getTemplates = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch templates");
  }

  const data = await response.json();

  return data.data || data.templates || [];
};
