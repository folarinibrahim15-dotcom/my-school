import React, { useState } from "react";

import { useGetFinancesQuery } from "../../../../../redux/api/financeApi";

import FinanceStatistics from "../components/FinanceStatistics";
import FinanceToolbar from "../components/FinanceToolbar";
import PaymentTable from "../components/PaymentTable";

import AddFinanceModal from "../components/AddFinanceModal";
import EditFinanceModal from "../components/EditFinanceModal";
import DeleteFinanceModal from "../components/DeleteFinanceModal";
import FinancePagination from "../components/FinancePagination";

export default function Finance() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [paymentType, setPaymentType] =useState("");

    const [selectedFinance, setSelectedFinance] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const {

        data,
        isLoading,
        isError,

    } = useGetFinancesQuery({
        page,
        limit,
        search,
        status,
        category: paymentType,
    });

    const payments = data?.data || [];
    const pages = data?.pages || 1;
//     console.log("Finance API Response:", data);
// console.log("Payments:", payments);
// console.log("Loading:", isLoading);
// console.log("Error:", isError);

    return (

        <div className="space-y-6">

            <FinanceStatistics
            payments={payments}
        />

            <FinanceToolbar
                search={search}
                setSearch={setSearch}

                status={status}
                setStatus={setStatus}

                paymentType={paymentType}
                setPaymentType={setPaymentType}

                onAdd={() => setShowAdd(true)}
            />

            {isLoading ? (

                <div className="bg-white rounded-xl p-10 text-center">

                    Loading payments...

                </div>

            ) : isError ? (

                <div className="bg-white rounded-xl p-10 text-center text-red-600">

                    Failed to load payments.

                </div>

            ) : (

                <PaymentTable

                    payments={payments}

                    onEdit={(finance) => {

                        setSelectedFinance(finance);

                        setShowEdit(true);

                    }}

                    onDelete={(finance) => {

                        setSelectedFinance(finance);

                        setShowDelete(true);

                    }}

                />

            )}

            <FinancePagination
            page={page}
            pages={data?.pagination?.pages}
            setPage={setPage}

        />

            <AddFinanceModal
                open={showAdd}
                onClose={() => setShowAdd(false)}
            />

            <EditFinanceModal
                open={showEdit}
                finance={selectedFinance}
                onClose={() => setShowEdit(false)}
            />

            <DeleteFinanceModal
                open={showDelete}
                finance={selectedFinance}
                onClose={() => setShowDelete(false)}
            />

        </div>

    );

}