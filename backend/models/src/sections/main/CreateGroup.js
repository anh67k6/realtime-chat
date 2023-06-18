import React from "react";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";

// Todo => create a reusable comp
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MEMBERS = [
    "Name 1",
    "Name 2",
    "Name 3",
];

const CreateGroupForm = ({ handleClose }) => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),

        members: Yup.array().min(2, "Must have at least 2 members"),
    });

    const defaultValues = {
        title: "",
        members: [],
    };

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = async (data) => {
        try {
            //  API Call
            console.log("DATA", data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFTextField name="title" label="Title" />
                <RHFAutocomplete
                    name="members"
                    label="Members"
                    multiple
                    freeSolo
                    options={MEMBERS.map((option) => option)}
                    ChipProps={{ size: "medium" }}
                />
                <Stack
                    spacing={2}
                    direction={"row"}
                    alignItems="center"
                    justifyContent={"end"}
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

const CreateGroup = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            <DialogTitle sx={{ mb: 3 }}>Create New Group</DialogTitle>

            <DialogContent>
                {/* Create Group Form */}
                <CreateGroupForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};

export default CreateGroup;