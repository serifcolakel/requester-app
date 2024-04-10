"use client";

import { CircleX, FilterIcon, X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { DataTableFacetedFilter } from "./faced-filter";
import { DataTableViewOptions } from "./view-options";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterParameters?: {
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
    key: keyof TData;
    title: string;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  filterParameters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <FilterIcon className="absolute top-1/2 left-2 -translate-y-1/2 h-4 w-4" />
          <Input
            className="h-8 w-[150px] lg:w-[250px] px-8"
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder="Filter on all columns"
            value={table.getState().globalFilter || ""}
          />
          {table.getState().globalFilter && (
            <TooltipProvider key="clear global filter">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-6 w-6 p-0 absolute transform top-1/2 right-2 -translate-y-1/2"
                    onClick={() => table.setGlobalFilter("")}
                    variant="icon"
                  >
                    <CircleX className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear global filter</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {filterParameters?.map((filterParameter) => (
          <DataTableFacetedFilter
            column={table.getColumn(String(filterParameter.key))}
            options={filterParameter.options}
            title={filterParameter.title}
          />
        ))}
        {isFiltered && (
          <Button
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
            variant="ghost"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
