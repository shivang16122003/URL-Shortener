import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import CustomInputField from "./CustomInputField"; 
import api from "../Apis/api"; 
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCustomContext } from "../ContextApi/contextApi";

const AddUrlPopup = ({ open, handleClose, handleSubmit }) => {
  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
    reset,
  } = useForm();
    const navigate = useNavigate();
  const {token} = useCustomContext(); 
  const onSubmit = async(data) => {
    handleSubmit(data.originalUrl);
    handleClose();
    reset();

    try {
      
    const response = await api.post('/api/urls/shorten', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
      console.log('success:', response.data.ogUrl);
       // Update context with the new token

      reset();
      navigate('/'); 
      toast.success('Hurray!! URl has been added');
    } catch (error) {
      console.error('login failed:', error);
      toast.error('Sorry your URL was not added');
    } 
    
  };
  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "	#f0f0f0", // light gray
          borderRadius: 3, 
          p: 2,
        },
      }}
    >
      <form onSubmit={submitForm(onSubmit)}>
        <DialogTitle className="text-blue-500"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          Add New URL
          <IconButton className="text-slate-900 hover:text-red-600" onClick={handleClose}>
            <CloseIcon  />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <CustomInputField
            name="originalUrl"
            label="Original URL"
            type="url"
            placeholder="https://example.com"
            register={register}
            errors={errors}
            required={true}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space", px: 3 }}>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUrlPopup;
