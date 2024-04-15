// TODO (serif) : write all services for like this approach
export const getActionTestFormData =
  (requestId: string, options: { script: string; id?: string }) =>
  (script: string): FormData => {
    const formData = new FormData();

    formData.append("script", script);
    formData.append("requestId", requestId);

    if (options.id) {
      formData.append("id", options.id);
    }

    return formData;
  };
