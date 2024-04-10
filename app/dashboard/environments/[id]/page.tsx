import Table from "@/app/dashboard/environments/table";
import { getVariablesById } from "@/services/variables/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: variables = [] } = await getVariablesById(params.id);

  return (
    <div className="p-4">
      <Table id={params.id} initialData={variables} />
    </div>
  );
}
