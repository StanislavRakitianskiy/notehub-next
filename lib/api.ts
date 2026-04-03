import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const baseUrl = "https://notehub-public.goit.study/api/notes";
const tmdbToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface CreateNoteResponse {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(baseUrl, {
    params,
    headers: {
      Authorization: `Bearer ${tmdbToken}`,
    },
  });
  return res.data;
};
export const createNote = async (rest: CreateNoteResponse): Promise<Note> => {
  const res = await axios.post<Note>(baseUrl, rest, {
    headers: {
      Authorization: `Bearer ${tmdbToken}`,
    },
  });
  return res.data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(baseUrl + `/${id}`, {
    headers: {
      Authorization: `Bearer ${tmdbToken}`,
    },
  });
  return res.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(baseUrl + `/${id}`, {
    headers: {
      Authorization: `Bearer ${tmdbToken}`,
    },
  });
  return res.data;
};
