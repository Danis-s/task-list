import React, {useEffect, useState} from "react";
import useApi from "../hooks/use-api";
import {TaskControllerApi, TaskSo} from "../openapi";
import {Form, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";

type InputFormProps = {
    FormInputValues?: TaskSo,
    onChange: (values?: TaskSo) => void
}

type FormValues = {
    title: string,
    description: string
}

const CreateTaskInput = (props: InputFormProps) => {

    const {register, handleSubmit} = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = data => {
        {props.onChange({
            title: data.title,
            description: data.description
        })}
        api.createTask(data)
            .then()
    }

    const api = useApi(TaskControllerApi);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const onCancel = () => {
        setShowCreateModal(false);
    }

    return (
        <div>
            <button className="btn btn-success" style={{margin: "10px"}} onClick={() => setShowCreateModal(true)}>Create</button>
            <Modal
                show={showCreateModal}
                onHide={onCancel}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>Create task</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group col-md-10">
                            <label style={{display: "block"}}>Title</label>
                            <input className="form-control" style={{display: "block"}} type="text" {...register("title", {required: true})}/>
                        </div>
                        <div className="form-group col-md-10">
                            <label style={{display: "block"}}>Description</label>
                            <textarea className="form-control" style={{display: "block"}} title="testTitle" {...register("description", {required: true})}></textarea>
                        </div>
                        <div>
                            <button style={{marginTop: "10px"}} className="btn btn-success" type="submit" onClick={onCancel}>Create</button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-dark" onClick={onCancel}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default CreateTaskInput;