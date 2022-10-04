import {TaskControllerApi, TaskSo} from "../openapi";
import {SubmitHandler, useForm} from "react-hook-form";
import useApi from "../hooks/use-api";
import React, {useState} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";

type InputFormProps = {
    FormInputValues?: TaskSo,
    onChange: (values?: TaskSo) => void,
    taskId?: number
}

type FormEditValues = {
    title: string,
    description: string
}

const EditeTaskInput = (props: InputFormProps) => {
    const {register, handleSubmit} = useForm<FormEditValues>()
    const onSubmit: SubmitHandler<FormEditValues> = data => {
        {props.onChange({
            title: data.title,
            description: data.description
        })}
        api.editTask(props.taskId? props.taskId: 0, data)
            .then()
    }

    const api = useApi(TaskControllerApi);
    const [showEditModal, setShowEditModal] = useState(false);

    const onCancel = () => {
        setShowEditModal(false);
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => {
                setShowEditModal(true);
            }}>Edit</button>
            <Modal
                show={showEditModal}
                onHide={onCancel}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>Edit task</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Title</label>
                            <input type="text" {...register("title", {required: true})}/>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea title="testTitle" {...register("description", {required: true})}></textarea>
                        </div>
                        <div>
                            <button className="btn btn-success" type="submit" onClick={onCancel}>Save</button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-dark" onClick={onCancel}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default EditeTaskInput;