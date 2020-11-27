import Config from "config";
import { useEffect, useState } from "react";
import orderBy from 'lodash.orderby';
import moment from 'moment'

export type PaginationHook<T> = {
  currentPage: number;
  onChangePage: (currentPage: number) => {};
  onChangeSort: (sortField: string, direction?: Array<"desc" | "asc">) => {};
  paginatedData: T[];
  totalPages: number;
  isLoading: boolean;
}

export const usePaginatioAndSort = <T>(callback: Function) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangePage = (currentPage: number) => {
    setCurrentPage(currentPage as number)
  }

  const onChangeSort = (sortField: string , direction: Array<"desc" | "asc"> = ['desc']) => {
    if(moment((paginatedData[0] as any)[sortField], "YYYY-MM-DD", true).isValid()){
      setPaginatedData(orderBy(paginatedData, sortField, direction))
    } else {
      setPaginatedData(orderBy(paginatedData, [(object: any) => new Date(object[sortField])], direction))
    }
  }

  useEffect(() => {
    const getPaginatedData = async () => {
      setIsLoading(true)
      const { data, total }: { data: T[], total: number } = await callback(currentPage)
      setPaginatedData(data)
      setTotalPages(Math.ceil((total / Config.paginationItemsPerPage)))
      setIsLoading(false)
    }

    getPaginatedData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return {
    currentPage,
    onChangePage,
    onChangeSort,
    paginatedData,
    totalPages,
    isLoading
  } as PaginationHook<T>
}