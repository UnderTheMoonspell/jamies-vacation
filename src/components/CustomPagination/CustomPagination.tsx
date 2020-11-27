import React, { SyntheticEvent } from "react";
import "./CustomPagination.scss";
import { Pagination, PaginationProps } from "semantic-ui-react";

export type CustomPaginationProps = {
  activePage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => {};
};

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  onPageChange,
  ...props
}) => {
  const customChange = (e: SyntheticEvent, data: PaginationProps) => {
    onPageChange(data.activePage as number);
  };

  return (
    <Pagination
      className="custom-pagination"
      {...props}
      onPageChange={customChange}
    />
  );
};
