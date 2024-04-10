export default async function Page({ params }: { params: { id: string } }) {
  return <div className="p-4">My ENV {params.id}</div>;
}
