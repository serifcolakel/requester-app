const handleCreateVariable = async (formData: FormData) => {
"use server";

    const { userId } = auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const name = formData.get("name") as string;

    const value = formData.get("value") as string;

    await db.variable.create({
      data: {
        name,
        value,
        environmentId: userId,
      },
    });

};
