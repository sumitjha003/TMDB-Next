import React from "react";
import { Input, Button, Dropdown, MenuProps } from "antd";
import {
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { Search as SearchIcon } from "lucide-react";

export type SortField = "createdAt" | "updatedAt" | "releaseDate";
export type SortOrder = "ASC" | "DESC";
export type StatusFilter = "ALL" | "Released" | "Pending";

interface Props {
  value: string;
  onChangeSearch: (val: string) => void;
  onSearchSubmit?: (val: string) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

const SearchSortFilter: React.FC<Props> = React.memo(
  ({
    value,
    onChangeSearch,
    onSearchSubmit,
    sortField,
    sortOrder,
    onSortChange,
  }) => {
    const sortOrderMenu: MenuProps["items"] = React.useMemo(
      () => [
        {
          key: "ASC",
          label: (
            <span
              className={
                sortOrder === "ASC" ? "text-[#01B4E4] font-medium" : ""
              }
            >
              Ascending
            </span>
          ),
          icon: (
            <SortAscendingOutlined
              className={sortOrder === "ASC" ? "text-[#01B4E4]" : ""}
            />
          ),
          onClick: () => onSortChange(sortField, "ASC"),
        },
        {
          key: "DESC",
          label: (
            <span
              className={
                sortOrder === "DESC" ? "text-[#01B4E4] font-medium" : ""
              }
            >
              Descending
            </span>
          ),
          icon: (
            <SortDescendingOutlined
              className={sortOrder === "DESC" ? "text-[#01B4E4]" : ""}
            />
          ),
          onClick: () => onSortChange(sortField, "DESC"),
        },
      ],
      [sortOrder, sortField, onSortChange]
    );

    const sortFieldMenu: MenuProps["items"] = React.useMemo(
      () => [
        {
          key: "createdAt",
          label: (
            <span
              className={
                sortField === "createdAt" ? "text-[#01B4E4] font-medium" : ""
              }
            >
              Created At
            </span>
          ),
          icon: (
            <CalendarOutlined
              className={sortField === "createdAt" ? "text-[#01B4E4]" : ""}
            />
          ),
          onClick: () => onSortChange("createdAt", sortOrder),
        },
        {
          key: "updatedAt",
          label: (
            <span
              className={
                sortField === "updatedAt" ? "text-[#01B4E4] font-medium" : ""
              }
            >
              Updated At
            </span>
          ),
          icon: (
            <ClockCircleOutlined
              className={sortField === "updatedAt" ? "text-[#01B4E4]" : ""}
            />
          ),
          onClick: () => onSortChange("updatedAt", sortOrder),
        },
        {
          key: "releaseDate",
          label: (
            <span
              className={
                sortField === "releaseDate" ? "text-[#01B4E4] font-medium" : ""
              }
            >
              Release Date
            </span>
          ),
          icon: (
            <CalendarOutlined
              className={sortField === "releaseDate" ? "text-[#01B4E4]" : ""}
            />
          ),
          onClick: () => onSortChange("releaseDate", sortOrder),
        },
      ],
      [sortField, sortOrder, onSortChange]
    );

    return (
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="w-full md:w-[350px] relative group h-12">
          <Input
            prefix={
              <SearchIcon className="w-5 h-5 text-white/40 group-focus-within:text-[#01B4E4] transition-colors duration-300" />
            }
            placeholder="Search movies..."
            value={value}
            onChange={(e) => onChangeSearch(e.target.value)}
            onPressEnter={(e) => {
              e.preventDefault();
              onSearchSubmit?.(value);
            }}
            className="h-12 bg-transparent border-white/10 text-white rounded-2xl hover:bg-white/5 focus:bg-white/5 focus:border-[#01B4E4]/50 focus:shadow-[0_0_30px_rgba(1,180,228,0.15)] transition-all text-base font-medium shadow-none [&>input]:bg-transparent [&>input]:text-white [&>input]:placeholder:text-white/30"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Order */}
          <Dropdown
            menu={{
              items: sortOrderMenu,
              selectedKeys: [sortOrder],
            }}
            trigger={["click"]}
          >
            <Button
              className="h-12 w-12 shrink-0 bg-transparent border border-white/10 rounded-2xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 hover:border-[#01B4E4]/50 shadow-lg text-lg group transition-all"
              icon={
                sortOrder === "ASC" ? (
                  <SortAscendingOutlined className="group-hover:text-[#01B4E4] transition-colors" />
                ) : (
                  <SortDescendingOutlined className="group-hover:text-[#01B4E4] transition-colors" />
                )
              }
            />
          </Dropdown>

          {/* Sort Field */}
          <Dropdown
            menu={{
              items: sortFieldMenu,
              selectedKeys: [sortField],
            }}
            trigger={["click"]}
          >
            <Button
              className="h-12 w-12 shrink-0 bg-transparent border border-white/10 rounded-2xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 hover:border-[#01B4E4]/50 shadow-lg text-lg group transition-all"
              icon={
                <FilterOutlined className="group-hover:text-[#01B4E4] transition-colors" />
              }
            />
          </Dropdown>
        </div>
      </div>
    );
  }
);

SearchSortFilter.displayName = "SearchSortFilter";

export default SearchSortFilter;
