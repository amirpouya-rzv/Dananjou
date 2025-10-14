"use client"
import React, { useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppInput from '@/components/shared/AppInput';
import AppButton from '@/components/shared/AppButton';
import AppSelect from '@/components/shared/AppSelect';
import { addDomainServices } from '@/app/services/domain';
import { adddomainType } from '@/app/types/domain';
import { errorToast, successToast } from '@/app/utils/toastUtils';

type AddDomainProps = {
  triggerIcon?: ReactNode;
  triggerClassName?: string;
  dialogTitle?: string;
  submitTitle?: string;
};

const AddDomain: React.FC<AddDomainProps> = ({
  triggerIcon,
  triggerTitle = "",
  triggerSubtitle = "",
  triggerClassName = "",
  dialogTitle = "Add Domain",
  submitTitle = "",
}) => {

  const [data, setData] = useState<adddomainType>({
    domain: "",
    isActive: false,
    status: 0,
  });

  // post domain
  const PostDomain = async () => {

    try {
      const res = await addDomainServices(data);
      successToast("Domain added successfully");
      if (res.status === 201) {
      } else {
        errorToast("Error adding domain");
      }
    } catch (err) {
      errorToast("Request failed");
    }
  };

  

  
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>
        <div className="flex items-center gap-3">
          {triggerIcon && (
            <div className="bg-white/30 p-2 rounded-full flex items-center justify-center">
              {triggerIcon}
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="font-semibold text-gray-900">{triggerTitle}</span>
            {triggerSubtitle && (
              <span className="text-xs text-gray-700 opacity-80">{triggerSubtitle}</span>
            )}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-5'>{dialogTitle}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={PostDomain}>
          <AppInput
            title='Domain:'
            placeholder='Insert your domain'
            value={data.domain}
            onChange={(e) => setData({ ...data, domain: e.target.value })}
          />

          <AppSelect
            defaultValue=''
            label='Status:'
            placeholder='Choose status'
            options={[
              { label: 'Pending', value: '1' },
              { label: 'Verified', value: '2' },
              { label: 'Rejected', value: '3' },
            ]}
            value={data.status.toString()}
            onChange={(value) => setData({ ...data, status: parseInt(value) })}
          />

          <AppSelect
            defaultValue=''
            label='Active:'
            placeholder='Choose activity'
            options={[
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ]}
            value={data.isActive ? 'true' : 'false'}
            onChange={(value) => setData({ ...data, isActive: value === 'true' })}
          />

          <AppButton title="Submit" type="submit"
          
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDomain;
