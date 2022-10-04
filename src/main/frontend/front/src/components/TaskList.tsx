import React, {useCallback, useEffect, useMemo, useState} from "react";
import useApi from "../hooks/use-api";
import {ChangeStatusTaskStatusEnum, Task, TaskControllerApi, TaskSo} from "../openapi";
import Table from "./Table";
import {ColumnDef} from "@tanstack/react-table";
import CreateTaskInput from "./CreateTaskInput";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import EditeTaskInput from "./EditeTaskInput";

const TaskList = () => {

    const columns = useMemo(() => [
        {
            header: "id",
            accessorKey: "id",
            accessorFn: (item => item.id)
        },
        {
            header: "created",
            accessorKey: "created",
            accessorFn: (item => item.created?.toDateString())
        },
        {
            header: "edited",
            accessorKey: "edited",
            accessorFn: (item => item.edited?.toDateString())
        },
        {
            header: "title",
            accessorKey: "title",
            accessorFn: (item => item.title)
        },
        {
            header: "description",
            accessorKey: "description",
            accessorFn: (item => item.description)
        },
        {
            header: "taskStatus",
            accessorKey: "taskStatus",
            accessorFn: (item => item.taskStatus)
        },
        {
            header: 'actions',
            accessorKey: 'id',
            cell: (props: any)=> <>
                <button className="btn btn-outline-primary" style={{marginRight: "10px"}} onClick={() => {
                    setShowDetail(true)
                    setTempoDetailId((props.row.original.id? props.row.original.id: 0))
                }}>Detail</button>
                <button className="btn btn-danger" onClick={() => {
                    setTempoTaskIdDelete((props.row.original.id? props.row.original.id : 0))
                }}>Delete</button>
            </>
        }
    ] as ColumnDef<Task>[], [])

    type FormValues = {
        status: ChangeStatusTaskStatusEnum;
    }
    const {register, handleSubmit} = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = data => {
        api.changeStatus(tempoDetailId, data.status)
            .then()
    }

    //tempoId
    const [tempoTaskIdDelete, setTempoTaskIdDelete] = useState(0);
    const [tempoDetailId, setTempoDetailId] = useState(0);

    //data
    const [inputValues, setInputValues] = useState<TaskSo>();
    const [editInputValues, setEditInputValues] = useState<TaskSo>();
    const [taskData, setTaskData] = useState<Task | undefined>();

    //modals
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);



    const api = useApi(TaskControllerApi);
    const fetchData = useCallback((page: number, size: number, sort: string[]) => api.getAllTask(page, size, sort), [api, inputValues, tempoTaskIdDelete, tempoDetailId]);

    useEffect(() => {
        api.deleteTask(tempoTaskIdDelete)
            .then();
        setTempoTaskIdDelete(0);
    }, [tempoTaskIdDelete]);

    useEffect(() => {
        api.getTaskById(tempoDetailId)
            .then(result => {
                setTaskData(result)
            })
    }, [tempoDetailId])

    console.log(tempoDetailId)
    return (
        <div>
            <CreateTaskInput FormInputValues={inputValues} onChange={setInputValues}/>
            <Table columns={columns} fetchData={fetchData}/>
            <Modal
                show={showDetail}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered={true}
            >
                <ModalHeader>Detail</ModalHeader>
                <ModalBody>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>{taskData?.id}</td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td>{taskData?.title}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{taskData?.description}</td>
                            </tr>
                            <tr>
                                <th>Created</th>
                                <td>{taskData?.created?.toDateString()}{taskData?.created?.toTimeString()}</td>
                            </tr>
                            <tr>
                                <th>Edited</th>
                                <td>{taskData?.edited?.toDateString()}{taskData?.edited?.toTimeString()}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{taskData?.taskStatus}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex">
                                <div className="form-group col-md-3">
                                    <div className="p-2">
                                        <select className="form-control" {...register("status")}>
                                            <option>PROCESS</option>
                                            <option>FINISHED</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2">
                                <button type="submit" className="btn btn-success" style={{margin: "5px"}} onClick={() => {
                                }}>Change status</button>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <EditeTaskInput onChange={setEditInputValues} FormInputValues={editInputValues} taskId={taskData?.id? taskData.id: 0}/>
                    <button className="btn btn-dark" onClick={() => {
                        setShowDetail(false)
                        setTempoDetailId(0);
                    }}>Close</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default TaskList;