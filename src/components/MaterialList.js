"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { format } from 'date-fns';

const MaterialList = ({ list }) => {

  const { data } = list;


 

  return (
    <div className="container pt-4 pb-12">
      <Table>
        <TableCaption>A list of your Items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ITEMS</TableHead>
            <TableHead>STORE </TableHead>
            <TableHead>Runner's Name </TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>CARD NO.</TableHead>
            <TableHead className="text-right">TRANSACTION DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.line_item_name}</TableCell>
              <TableCell>{item.store}</TableCell>
              <TableCell>{item.runners_name}</TableCell>
              <TableCell >{item.amount}</TableCell>
              <TableCell >{item.card_number}</TableCell>
              <TableCell className="text-right">{item.transaction_date ? format(new Date(item.transaction_date), 'dd MMM, yyyy') : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
    </div>
  );
};

export default MaterialList;
