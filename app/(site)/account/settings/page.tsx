'use client';
import PencilIcon from "@/app/icons/PencilIcon";
import { useAppSelector } from "@/app/redux/hooks";
import { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import CardTitle from "@/app/components/CardTitle";
import FormContainer from "@/app/components/FormContainer";
import SaveButton from "@/app/components/SaveButton";
import ChangeEmail from "./ChangeEmail";
import CompanyDetails from "./CompanyDetails";
import ChangePhone from "./ChangePhone";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";



export default function page() {
  


  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="min-h-[400px] rounded-xl shadow">
          <PersonalDetails />
        </div>

        <div className="min-h-[400px] grid grid-flow-row gap-3">
          <div className="min-h-[200px] shadow rounded-xl ">
            <CompanyDetails />
          </div>

          <div className="min-h-[120px] shadow rounded-xl ">
            <ChangeEmail />
          </div>

          <div className="min-h-[120px] shadow rounded-xl ">
            <ChangePhone />
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="min-h-[120px] shadow rounded-xl ">
          <ChangePassword />
        </div>

        <div className="min-h-[120px] shadow rounded-xl ">
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}
