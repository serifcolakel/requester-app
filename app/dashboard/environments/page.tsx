import Table from "@/app/dashboard/environments/table";
import { getEnvironments } from "@/services/environments/actions";

export default async function Page() {
  const { data: environments = [] } = await getEnvironments();

  return (
    <div className="p-4">
      <Table initialData={environments} />
    </div>
  );
}
