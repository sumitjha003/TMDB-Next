import { notFound } from "next/navigation";
import EditMoviePage from "./EditForm";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  return <EditMoviePage movieId={id} onClose={() => {}} />;
}
