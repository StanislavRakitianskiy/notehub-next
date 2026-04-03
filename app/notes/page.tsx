import NoteClient from "./NoteClient.client";
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ page: number; topic: string }>;
};

async function Notes({ params }: Props) {
  const { page, topic } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["article", page, topic],
    queryFn: () => fetchNotes({ page, perPage: 12, search: topic }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
}

export default Notes;
