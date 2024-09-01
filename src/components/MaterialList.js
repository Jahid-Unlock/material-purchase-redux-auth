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

const MaterialList = ({ list }) => {
  const { data } = list;

  console.log(data)

  return (
    <div className="container py-4">
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
              <TableCell className="text-right">{item.transaction_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaterialList;
