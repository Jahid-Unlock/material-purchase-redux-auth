"use client";

import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CirclePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { format } from 'date-fns';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const AddMaterial = () => {

    const router = useRouter();
    const [apiHeaders, setApiHeaders] = useState({});
    const [openDialog, setopenDialog] = useState(false)

    const [createdRowsMaterialPurchase, setCreatedRowsMaterialPurchase] = useState([])

    const handleCreateNewRowMaterialPurchase = () => {

        setCreatedRowsMaterialPurchase(prevRows => {
            return [...prevRows, MaterialPurchaseFields];
        })
    }

    useEffect(() => {
        const token = Cookies.get('authToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        };
        setApiHeaders(headers);
    }, []);


    const MaterialPurchaseFields = {
        items: {
            value: '',
            type: 'text',
            visible_side_note: false,
            visible_side_notes: [],
        },
        store: {
            value: '',
            type: 'text',
            visible_side_note: false,
            visible_side_notes: [],
        },
        runners_name: {
            value: '',
            type: 'text',
            visible_side_note: false,
            visible_side_notes: [],
        },
        amount: {
            value: '',
            type: 'number',
            visible_side_note: false,
            visible_side_notes: [],
        },
        cardNumber: {
            value: '',
            type: 'text',
            visible_side_note: false,
            visible_side_notes: [],
        },
        transactionDate: {
            value: '',
            type: 'date',
            visible_side_note: false,
            visible_side_notes: []
        },
        action: {
            value: '',
            type: 'delete',
            visible_side_note: false,
            visible_side_notes: []
        },

    };

    function materialPurchaseFieldValidation(e, dataType = null) {
        let resP = true;
        if (dataType === 'number') {
            const regex = /^(\-?)+\d*\.?\d{0,2}$/;
            if (!(regex.test(e.target.value))) {
                e.target.setCustomValidity('Please enter a valid number.');
                e.target.style.border = '1px solid red';
                resP = false
            } else {
                e.target.setCustomValidity('');
                e.target.style.border = '';
            }
        }
        else if (dataType === 'text') {
            const htmlTagsRegex = /<\/?[^>]+(>|$)/g;
            if ((htmlTagsRegex.test(e.target.value))) {
                e.target.setCustomValidity('Please enter valid text.');
                e.target.style.border = '1px solid red';
                resP = false
            } else {
                e.target.setCustomValidity('');
                e.target.style.border = '';
            }
        }
        if (dataType === 'card_number') {
            const regex = /^(\-?)+\d*\.?\d{0,2}$/;
            if (!(regex.test(e.target.value))) {
                e.target.setCustomValidity('Please enter a valid number.');
                e.target.style.border = '1px solid red';
                resP = false
            } else {
                e.target.setCustomValidity('');
                e.target.style.border = '';
            }
        }

        return resP;
    }


    const handleInputValue = (value, rowIndex, cell) => {
        setCreatedRowsMaterialPurchase(prevRows => {
            if (prevRows[rowIndex][cell] && prevRows[rowIndex][cell].hasOwnProperty('value')) {
                if (prevRows[rowIndex][cell].type === 'number') {
                    prevRows[rowIndex][cell].value = (value == '.' ? '0.' : value);
                }
                else if (prevRows[rowIndex][cell].type === 'select') {
                    prevRows[rowIndex][cell].value = event.target.value
                }
                else if (["text", "date"].includes(prevRows[rowIndex][cell].type)) {
                    prevRows[rowIndex][cell].value = value
                }

            }

            const totalMaterialPayment = prevRows.reduce((sum, row) => {
                return sum + Number(row['amount'].value);
            }, 0);

            return [...prevRows]

        })
    }

    function renderCellMaterialPurchase(row, cell, rowIndex, cellIndex) {
        let html = null;
        const rowCell = row[cell];
        switch (cell) {
            case 'items':
                html = (
                    <td><input className="common_input" type={'text'} placeholder="" value={rowCell.value} onChange={(e) => {
                        if (materialPurchaseFieldValidation(e, rowCell.type)) {
                            handleInputValue(e.target.value, rowIndex, cell)
                        }

                    }} /></td>
                )
                break;
            case 'store':
                html = (
                    <td>
                        <input className="common_input" type={'text'}  value={rowCell.value} onChange={(e) => {
                            if (materialPurchaseFieldValidation(e, rowCell.type)) {
                                handleInputValue(e.target.value, rowIndex, cell)
                            }
                        }} />
                    </td>
                )
                break;
            case 'runners_name':
                html = (
                    <td>
                        <input className="common_input" type={'text'}  value={rowCell.value} onChange={(e) => {
                            if (materialPurchaseFieldValidation(e, rowCell.type)) {
                                handleInputValue(e.target.value, rowIndex, cell)
                            }
                        }} />

                    </td>
                )
                break;
            case 'amount':
                html = (
                    <td>
                        <span className='flex items-center gap-1 text-black-50'>&#36;
                            <input className="common_input" type={'text'} placeholder=""  value={rowCell.value} onChange={(e) => {
                                if (materialPurchaseFieldValidation(e, rowCell.type)) {
                                    handleInputValue(e.target.value, rowIndex, cell)
                                }

                            }} />
                        </span>
                    </td>
                )
                break;
            case 'cardNumber':
                html = (
                    <td>
                        <input className="common_input" type={'text'} maxLength="5" value={rowCell.value} onChange={(e) => {
                        if (materialPurchaseFieldValidation(e, 'card_number')) {
                            handleInputValue(e.target.value, rowIndex, cell)
                        }
                    }} /></td>
                )
                break;
            case 'transactionDate':
                html = (
                    <td>
                         <input
                         className="common_input" 
                                type="date"
                                value={rowCell.value}
                                onChange={(e) => {
                                    if (materialPurchaseFieldValidation(e, rowCell.type)) {
                                        handleInputValue(e.target.value, rowIndex, cell);
                                    }
                                }}
                            />
                    </td>
                );
                break;

            case 'action':
                html = (
                    <td className="text-center py-3">
                        <Button size="icon" variant={"ghost"}  type="button" onClick={(e) => handleDeleteRow(e, rowIndex)}><Trash2 /></Button>
                    </td>
                )
                break;
        }

        return html;

    }

    const handleDeleteRow =(e, index)=>{
        setCreatedRowsMaterialPurchase(prev => ([...prev.filter((_, i) => i !== index)]))
    }


    const handleFormSubmit = async () => {
        const materialPurchaseData = createdRowsMaterialPurchase.map((data) => {
            const formattedDate = data?.transactionDate?.value ? format(new Date(data.transactionDate.value), 'MM-dd-yyyy') : null;
        
            return {
                line_item_name: data?.items?.value,
                store: data?.store?.value,
                runners_name: data?.runners_name?.value,
                amount: data?.amount?.value,
                card_number: data?.cardNumber?.value,
                transaction_date: formattedDate,
            };
        });
    
        const payload = {
            material_purchase: materialPurchaseData
        };
        try {
            const response = await fetch('https://devapi.propsoft.ai/api/auth/interview/material-purchase', {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                errorData.status_message && toast.error(errorData.status_message)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            responseData.status_message && toast.success(responseData.status_message)
            setopenDialog(false)
            setCreatedRowsMaterialPurchase([])
            router.refresh()
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="container flex items-center justify-between mt-12 pb-6">
             <Toaster />
            <h3 className="text-4xl font-semibold text-primary">Material Purchase</h3>
            <Dialog open={openDialog} onOpenChange={setopenDialog}>
                <DialogTrigger asChild>
                    <Button size="lg" onClick={()=> setopenDialog(true)}>Add Material Purchase</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[1400px]">
                    <DialogHeader>
                        <DialogTitle>Material Purchase</DialogTitle>
                    </DialogHeader>
                    <div className="py-6 my-3 border-t border-b">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ITEMS*</TableHead>
                                    <TableHead>STORE*</TableHead>
                                    <TableHead>Runner's Name*</TableHead>
                                    <TableHead>AMOUNT*</TableHead>
                                    <TableHead>CARD NO.*</TableHead>
                                    <TableHead>TRANSACTION DATE*</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    createdRowsMaterialPurchase.length > 0 &&  createdRowsMaterialPurchase.map((r, rowIndex) => (
                                        <TableRow className="py-2" data-rowindex={rowIndex} key={rowIndex}>
                                            {Object.keys(r).map((cell, cellIndex) => renderCellMaterialPurchase(r, cell, rowIndex, cellIndex))}
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <div className="text-end mt-4">
                            <Button onClick={handleCreateNewRowMaterialPurchase} size="icon" variant="secondary">
                                <CirclePlus />
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button size="lg" onClick={() => handleFormSubmit()}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddMaterial;
