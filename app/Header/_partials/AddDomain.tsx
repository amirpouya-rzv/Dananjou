"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppInput from "@/components/shared/AppInput";
import AppButton from "@/components/shared/AppButton";
import AppSelect from "@/components/shared/AppSelect";
import { addDomainServices, editDomainServices } from "@/app/services/domain";
import { adddomainType, domainType } from "@/app/types/domain";
import { errorToast, successToast } from "@/app/utils/toastUtils";
import { LiaSpinnerSolid } from "react-icons/lia";

interface AddDomainProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  setSelectedItem?: React.Dispatch<React.SetStateAction<domainType>>;
  selecteItem?: domainType;
  refreshList?: () => void;
  buttonLabel?: string | React.ReactNode;
}

const AddDomain = ({
  open,
  setOpen,
  selecteItem,
  setSelectedItem,
  refreshList,
  buttonLabel = "+ Add Domain", 
}: AddDomainProps) => {
  const initailvalues = {
    domain: "",
    status: "",
    isActive: "",
  };

  const [data, setData] = useState<adddomainType>(initailvalues);
  const [loading, setLoading] = useState(false);

  // validation
  const validateForm = () => {
    if (!data.domain.trim()) {
      errorToast("Please enter a domain name.");
      return false;
    }

    const domainRegex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(data.domain.trim())) {
      errorToast("Invalid domain format. Example: www.example.com");
      return false;
    }

    if (![1, 2, 3].includes(data.status)) {
      errorToast("Please select a valid status (Pending, Verified, Rejected).");
      return false;
    }

    if (typeof data.isActive !== "boolean") {
      errorToast("Please choose whether the domain is active or inactive.");
      return false;
    }

    return true;
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = selecteItem
        ? await editDomainServices(selecteItem.id, data)
        : await addDomainServices(data);

      if (res.status === 200 || res.status === 201) {
        successToast(
          selecteItem
            ? "Domain edited successfully"
            : "Domain added successfully"
        );
        setOpen(false);
        setData(initailvalues);
        refreshList?.();
      } else {
        errorToast("Error while saving domain.");
      }
    } catch (err) {
      errorToast("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // load edit data
  useEffect(() => {
    if (selecteItem) {
      setData({
        domain: selecteItem.domain || "",
        status: selecteItem.status ? selecteItem.status : "",
        isActive:
          typeof selecteItem.isActive === "boolean"
            ? selecteItem.isActive
            : selecteItem.isActive === "true",
      });
    } else {
      setData(initailvalues);
    }
  }, [selecteItem]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="text-emerald-700 font-semibold border border-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-700 hover:text-white transition"
        onClick={() => setSelectedItem?.()}
      >
        {buttonLabel}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selecteItem ? "Edit Domain" : "Add Domain"}
          </DialogTitle>
          <DialogDescription>
            Enter your domain information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <AppInput
            title="Domain:"
            placeholder="Insert your domain (e.g., www.example.com)"
            value={data.domain}
            onChange={(e) => setData({ ...data, domain: e.target.value })}
          />

          <AppSelect
            label="Status:"
            placeholder="Choose status"
            options={[
              { label: "Pending", value: "1" },
              { label: "Verified", value: "2" },
              { label: "Rejected", value: "3" },
            ]}
            value={data.status !== "" ? data.status.toString() : ""}
            onChange={(value) => setData({ ...data, status: parseInt(value) })}
          />

          <AppSelect
            label="Active:"
            placeholder="Choose activity"
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
            value={
              data.isActive !== "" ? (data.isActive ? "true" : "false") : ""
            }
            onChange={(value) => setData({ ...data, isActive: value === "true" })}
          />

          <AppButton
            title={
              loading ? (
                <span className="animate-spin inline-block">
                  <LiaSpinnerSolid size={20} />
                </span>
              ) : (
                "Submit"
              )
            }
            type="submit"
            disabled={loading}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDomain;
