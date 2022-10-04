import {PropsWithChildren, ReactElement, useEffect, useMemo, useState} from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable
} from '@tanstack/react-table'
import {Form, Pagination, Table as BTable} from "react-bootstrap";
import "./Table.css"

type Page<T> = {
    totalPages?: number;
    content?: Array<T>;
}
type TableProps<T extends object> = {
    columns: ColumnDef<T>[];
    fetchData: (page: number, size: number, sort: string[]) => Promise<Page<T>>
}

export function Table<T extends object>({columns, fetchData}: PropsWithChildren<TableProps<T>>): ReactElement {
    const [pageData, setPageData] = useState<Page<T> | undefined>();
    const [sorting, setSorting] = useState<SortingState>([])
    const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const pagination = useMemo(() => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]);


    const table = useReactTable({
        columns,
        data: pageData?.content || [],
        pageCount: pageData?.totalPages,
        state: {
            sorting,
            pagination
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });


    useEffect(() => {
        fetchData(table.getState().pagination.pageIndex, table.getState().pagination.pageSize, sorting.map((sort: { id: any; desc: any; }) => `${sort.id},${sort.desc ? 'DESC' : 'ASC'}`))
            .then(result => setPageData(result))
    }, [table.getState().pagination.pageIndex, table.getState().pagination.pageSize, sorting, fetchData, table]);
    return (
        <div>
            <BTable className="table table-striped">
                <thead className="table-dark">
                {table.getHeaderGroups().map((headerGroup: {id: string | number | null | undefined; headers: any[]; }) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                scope="col" key={header.id} colSpan={header.colSpan}
                                role={header.column.getCanSort() ? 'Button': undefined}
                                onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                                className={header.column.sorting}
                                style={{width: header.getSize()}}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                {{
                                    asc: <i className="ms-1 bi bi-sort-up"></i>,
                                    desc: <i className="ms-1 bi bi-sort-down"></i>,
                                }[header.column.getIsSorted() as string] ?? null}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row: {id: string | number | null | undefined; getVisibleCells: () => any[]; }) => {
                    return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                return (
                                    <td key={cell.id} className="tdClass">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </BTable>
            <div className="d-flex" style={{marginBottom: "50px"}}>
                <div className="p-4">
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                </div>
                <div className="p-3">
                    <Pagination className="pagination">
                        <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}/>
                        <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}/>
                        <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}/>
                        <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                         disabled={!table.getCanNextPage()}/>
                    </Pagination>
                </div>
                <div className="p-3">
                    <Form.Select value={table.getState().pagination.pageSize}
                                 onChange={event => table.setPageSize(Number(event.target.value))}>
                        {[10, 25, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            </div>
        </div>
    )
}
export default Table;