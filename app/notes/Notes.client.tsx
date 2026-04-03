"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./page.module.css";

const NoteClient = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", page, topic],
    queryFn: () => fetchNotes({ page, perPage: 12, search: topic }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPage: number = data?.totalPages ?? 1;
  const handleOnPageChange = (newChange: number) => {
    setPage(newChange);
  };

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setTopic(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateSearchQuery(value);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onChange={handleSearchChange} />

        {totalPage > 1 && (
          <Pagination
            currentPage={page}
            totalPage={totalPage}
            onPageChange={handleOnPageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading ...</p>}
      {isError && <p>Error server</p>}
      {data && data.notes.length > 0 && <NoteList note={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};
export default NoteClient;
