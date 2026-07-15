"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Input,
  Dropdown,
  Button,
  Modal,
  ConfigProvider,
  theme,
  Tooltip,
  Pagination,
} from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ListPersonsQuery,
  ListPersonsSortFields,
  SortOrder,
} from "@/app/gql/graphql";
import { LIST_PERSON } from "@/app/graphql/queries";
import useDebounce from "@/app/hooks/debounce";

import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PersonCard from "@/app/components/PersonCard";

const DeletePerson = dynamic(() => import("@/app/components/DeletePerson"), {
  ssr: false,
});
const EditPerson = dynamic(() => import("@/app/components/EditPerson"), {
  ssr: false,
});
const AddPerson = dynamic(() => import("@/app/components/AddPerson"), {
  ssr: false,
});
const ViewPerson = dynamic(() => import("@/app/components/ViewPerson"), {
  ssr: false,
});
const LoginModal = dynamic(() => import("@/app/components/LoginModal"), {
  ssr: false,
});

import { Search as SearchIcon, X } from "lucide-react";

type Person = NonNullable<
  NonNullable<ListPersonsQuery["listPersons"]>["data"]
>[number];

interface PersonClientProps {
  initialPersons: Person[];
  initialTotalCount: number;
}

export default function PersonClient({
  initialPersons,
  initialTotalCount,
}: PersonClientProps) {

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const [hasInteracted, setHasInteracted] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = urlSearchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  });
  const pageSize = 5;
  const [searchTerm, setSearchTerm] = useState(
    () => urlSearchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Initialize state from URL
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    const order = urlSearchParams.get("order");
    return order === "desc" ? SortOrder.Desc : SortOrder.Asc;
  });
  const [sortField, setSortField] = useState<ListPersonsSortFields>(() => {
    const field = urlSearchParams.get("sort");
    return (field as ListPersonsSortFields) || ListPersonsSortFields.CreatedAt;
  });

  // Sync state to URL using Next.js router
  useEffect(() => {
    const params = new URLSearchParams(urlSearchParams.toString());

    if (currentPage > 1) params.set("page", currentPage.toString());
    else params.delete("page");

    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");

    if (sortField !== ListPersonsSortFields.CreatedAt)
      params.set("sort", sortField);
    else params.delete("sort");

    if (sortOrder === SortOrder.Desc) params.set("order", "desc");
    else params.delete("order");

    const newSearch = params.toString();
    const currentSearch = urlSearchParams.toString();

    if (newSearch !== currentSearch) {
      router.replace(`${pathname}?${newSearch}`, { scroll: false });
    }
  }, [
    currentPage,
    debouncedSearch,
    sortField,
    sortOrder,
    pathname,
    router,
    urlSearchParams,
  ]);

  const handleSortFieldChange = (field: ListPersonsSortFields) => {
    setHasInteracted(true);
    setSortField(field);
    setCurrentPage(1); // Reset to page 1 on sort change
  };

  const handleSortOrderChange = () => {
    setHasInteracted(true);
    setSortOrder((prev) =>
      prev === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc
    );
  };

  const handlePageChange = (page: number) => {
    setHasInteracted(true);
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    "edit" | "delete" | "create" | null
  >(null);
  const [pendingPersonId, setPendingPersonId] = useState<string | null>(null);
  const [forceRefetch, setForceRefetch] = useState(false);

  const isDefaultState =
    currentPage === 1 &&
    !debouncedSearch &&
    sortOrder === SortOrder.Asc &&
    sortField === ListPersonsSortFields.CreatedAt;

  const shouldSkipQuery = !hasInteracted && isDefaultState && !forceRefetch;

  const { loading, data, refetch, previousData } = useQuery<ListPersonsQuery>(
    LIST_PERSON,
    {
      variables: {
        filter: {
          limit: pageSize,
          skip: (currentPage - 1) * pageSize,
          searchTerm: debouncedSearch,
        },
        sort: {
          field: sortField,
          order: sortOrder,
        },
      },
      skip: shouldSkipQuery,
      fetchPolicy: "cache-and-network",
    }
  );

  const activeData = data ?? previousData;
  const showInitial = shouldSkipQuery; // Equivalent to using initial props

  const persons: Person[] = useMemo(() => {
    if (showInitial) return initialPersons;
    return (
      activeData?.listPersons?.data?.filter((p): p is Person => p !== null) ??
      []
    );
  }, [showInitial, initialPersons, activeData]);

  const totalCount = showInitial
    ? initialTotalCount
    : activeData?.listPersons?.count ?? 0;

  useEffect(() => {
    const editId = urlSearchParams.get("edit");
    const deleteId = urlSearchParams.get("delete");
    const viewId = urlSearchParams.get("view");
    const createParam = urlSearchParams.get("create");

    if (!editId && !deleteId && !viewId && !createParam) return;

    // Small timeout to allow data to exist if needed, though with Apollo cache it might be immediate.
    setTimeout(() => {
      if (createParam === "true") setIsCreateModalOpen(true);
      else {
        // We look in persons (which might be initialPersons or fetched)
        const p = persons.find((x) => x?.id === (editId || viewId || deleteId));
        if (p) {
          setSelectedPerson(p);
          if (editId) setIsEditModalOpen(true);
          else if (viewId) setIsViewModalOpen(true);
          else if (deleteId) setIsDeleteModalOpen(true);
        }
      }
      // Cleanup URL params without full page reload
      const newParams = new URLSearchParams(urlSearchParams.toString());
      newParams.delete("edit");
      newParams.delete("delete");
      newParams.delete("create");
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, 100);
  }, [persons, urlSearchParams, pathname, router]);

  // Handlers
  const handleDelete = (record: Person) => {
    if (!record?.id) return;
    if (!session) {
      setPendingAction("delete");
      setPendingPersonId(record.id);
      setLoginModalOpen(true);
      return;
    }
    setSelectedPerson(record);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (record: Person) => {
    if (!record?.id) return;
    if (!session) {
      setPendingAction("edit");
      setPendingPersonId(record.id);
      setLoginModalOpen(true);
      return;
    }
    setSelectedPerson(record);
    setIsEditModalOpen(true);
  };

  const handleView = (record: Person) => {
    if (!record) return;
    setSelectedPerson(record);
    setIsViewModalOpen(true);
  };

  const sortFieldItems = [
    {
      key: "name",
      label: (
        <span
          className={
            sortField === ListPersonsSortFields.Name
              ? "text-[#01B4E4] font-medium"
              : ""
          }
        >
          Name
        </span>
      ),
      onClick: () => handleSortFieldChange(ListPersonsSortFields.Name),
    },
    {
      key: "created",
      label: (
        <span
          className={
            sortField === ListPersonsSortFields.CreatedAt
              ? "text-[#01B4E4] font-medium"
              : ""
          }
        >
          Date Created
        </span>
      ),
      onClick: () => handleSortFieldChange(ListPersonsSortFields.CreatedAt),
    },
    {
      key: "updated",
      label: (
        <span
          className={
            sortField === ListPersonsSortFields.UpdatedAt
              ? "text-[#01B4E4] font-medium"
              : ""
          }
        >
          Last Updated
        </span>
      ),
      onClick: () => handleSortFieldChange(ListPersonsSortFields.UpdatedAt),
    },
  ];

  const handleModalCloseWithRefresh = (
    setModalOpen: (open: boolean) => void
  ) => {
    setModalOpen(false);
    setForceRefetch(true); // Force next render to use useQuery
    refetch(); // Trigger re-fetch immediately
  };
  console.log("persons", persons);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#01B4E4",
          colorBgContainer: "transparent",
          borderRadius: 12,
        },
      }}
    >
      <div className="min-h-screen bg-[#020617] selection:bg-cyan-500/30 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none"></div>
        <div className="flex justify-start px-6 pt-6 ml-4 relative z-10">
          <div className="mt-2">
            <Breadcrumbs />
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto p-6 md:p-12 pt-0 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div className="space-y-4 -mt-12">
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Cast &{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">
                  Crew.
                </span>
              </h1>
              <p className="text-white/40 text-lg max-w-md font-medium leading-relaxed">
                Your hub for cast, crew, and creators.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-[350px] relative group">
                <Input
                  prefix={
                    <SearchIcon className="w-5 h-5 text-white/40 group-focus-within:text-[#01B4E4] transition-colors duration-300" />
                  }
                  placeholder="Search..."
                  className="h-12 bg-[#0f172a]/80 backdrop-blur-xl border-white/5 text-white rounded-2xl hover:bg-[#1e293b] focus:bg-[#1e293b] focus:border-[#01B4E4]/50 focus:shadow-[0_0_30px_rgba(1,180,228,0.15)] transition-all text-base font-medium shadow-xl [&>input]:bg-transparent [&>input]:text-white [&>input]:placeholder:text-white/30"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center gap-3 w-auto shrink-0">
                <Dropdown
                  menu={{ items: sortFieldItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <Button className="h-12 w-12 shrink-0 bg-[#0f172a]/80 border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#1e293b] hover:border-[#01B4E4]/50 shadow-lg text-lg group transition-all">
                    <FilterOutlined className="group-hover:text-[#01B4E4] transition-colors" />
                  </Button>
                </Dropdown>

                <Tooltip
                  title={
                    sortOrder === SortOrder.Asc
                      ? "Sort Ascending"
                      : "Sort Descending"
                  }
                >
                  <Button
                    className="h-12 w-12 shrink-0 bg-[#0f172a]/80 border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#1e293b] hover:border-[#01B4E4]/50 shadow-lg text-lg group transition-all"
                    onClick={handleSortOrderChange}
                  >
                    {sortOrder === SortOrder.Asc ? (
                      <SortAscendingOutlined
                        className={
                          sortOrder === SortOrder.Asc
                            ? "text-[#01B4E4] transition-colors"
                            : "group-hover:text-[#01B4E4] transition-colors"
                        }
                      />
                    ) : (
                      <SortDescendingOutlined
                        className={
                          sortOrder === SortOrder.Desc
                            ? "text-[#01B4E4] transition-colors"
                            : "group-hover:text-[#01B4E4] transition-colors"
                        }
                      />
                    )}
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
            {loading && !persons.length
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-3/4 rounded-2xl bg-white/5 animate-pulse border border-white/5"
                    />
                  ))
              : persons.map((person) => (
                  <PersonCard
                    key={person?.id}
                    person={person}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
          </div>
          <div className="flex justify-center pb-12">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              showSizeChanger={false}
              onChange={handlePageChange}
              className="custom-pagination"
            />
          </div>
        </div>
      </div>

      {selectedPerson?.id && (
        <DeletePerson
          personId={selectedPerson.id}
          personName={selectedPerson.name ?? ""}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedPerson(null);
          }}
          onSuccess={async () => {
            setForceRefetch(true);
            await refetch();
            setIsDeleteModalOpen(false);
          }}
        />
      )}

      <Modal
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={700}
        centered
        closable={false}
        modalRender={() => (
          <div className="relative">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {selectedPerson && <ViewPerson person={selectedPerson} />}
          </div>
        )}
      />

      {isEditModalOpen && selectedPerson?.id && (
        <EditPerson
          personId={selectedPerson.id}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => handleModalCloseWithRefresh(setIsEditModalOpen)}
        />
      )}

      {isCreateModalOpen && (
        <AddPerson
          onClose={() => handleModalCloseWithRefresh(setIsCreateModalOpen)}
        />
      )}

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => {
          setLoginModalOpen(false);
          setPendingAction(null);
        }}
        message={`Please sign in to ${pendingAction} records.`}
        callbackUrl={
          pendingAction === "create"
            ? "/person?create=true"
            : `/person?${pendingAction}=${pendingPersonId}`
        }
      />
    </ConfigProvider>
  );
}
