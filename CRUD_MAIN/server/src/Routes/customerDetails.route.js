import express from "express";

import {
  getCustomerDetails,
  createNewCustomerDetail,
  UpdateCustomerDetail,
  DeleteCustomerDetail,
} from "../Controllers/customerDetails.controller.js";

export const customersRoutes = express.Router();

customersRoutes.get("/", getCustomerDetails);
customersRoutes.post("/", createNewCustomerDetail);
customersRoutes.patch("/:id", UpdateCustomerDetail);
customersRoutes.delete("/:id", DeleteCustomerDetail);

export default customersRoutes;
