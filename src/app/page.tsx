import getApiHeaders from "@/lib/getApiHeaders"
import Header from "@/components/Header"
import MaterialList from "@/components/MaterialList";
import AddMaterial from "@/components/AddMaterial";
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
import { format, isValid  } from 'date-fns';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


async function getMaterialPurchases(page: any) {
  const res = await fetch(`https://devapi.propsoft.ai/api/auth/interview/material-purchase?page=${page}`, {
    cache: 'no-store',
    headers: getApiHeaders(),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home({ searchParams }) {
  const page = searchParams?.page || 1;
  const { material_purchase_list } = await getMaterialPurchases(page);
  let listData = material_purchase_list.data


  // let data = await fetch(`https://devapi.propsoft.ai/api/auth/interview/material-purchase?page=${page}`, {
  //   headers: getApiHeaders(),
  // })
  // let { material_purchase_list } = await data.json();
  // let listData = material_purchase_list.data

  // console.log(material_purchase_list.data);

  let currentPage = material_purchase_list.current_page
  let lastPage = material_purchase_list.last_page
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <main>
      <Header />
      <AddMaterial />
      {/* <MaterialList list={material_purchase_list} totalPages={material_purchase_list.last_page} /> */}

      <div className="container">
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
            {listData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.line_item_name}</TableCell>
                <TableCell>{item.store}</TableCell>
                <TableCell>{item.runners_name}</TableCell>
                <TableCell >{item.amount}</TableCell>
                <TableCell >{item.card_number}</TableCell>
                <TableCell className="text-right">
                {item.transaction_date && isValid(new Date(item.transaction_date)) ? format(new Date(item.transaction_date), 'dd MMM, yyyy') 
    : null} 
                
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="pt-10 pb-20">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={currentPage > 1 ? `/?page=${currentPage - 1}` : '#'}>
                Previous
              </PaginationPrevious>
            </PaginationItem>
            {pages?.map((page => (
              <li key={page}>
                <PaginationLink href={`/?page=${page}`} isActive={page === currentPage ? true : false}>
                  {page}
                </PaginationLink>
              </li>
            )))}
            <PaginationItem>
              <PaginationNext href={currentPage < lastPage ? `/?page=${currentPage + 1}` : '#'}>
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}


