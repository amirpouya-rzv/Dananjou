"use client";
import React, { useEffect, useState } from "react";
import { domainType } from "../types/domain";
import { getDomainServices, deleteDomainServices } from "../services/domain";
import moment from "moment";
import { LiaEditSolid } from "react-icons/lia";
import { BiTrash } from "react-icons/bi";
import Tooltip from "../utils/tooltipUtils";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { successToast, errorToast } from "@/app/utils/toastUtils";
import AddDomain from "../Header/_partials/AddDomain";
import AppSelect from "@/components/shared/AppSelect";
import SearchInput from "@/components/shared/SearchInput";
import { PiSealWarningLight } from "react-icons/pi";
import AppButton from "@/components/shared/AppButton";

function Table() {
  const [open, setOpen] = useState(false);
  const [selecteItem, setSelectedItem] = useState<domainType>(null);

  const [data, setData] = useState<domainType[]>([]);

  // search
  const [mainData, setMainData] = useState<domainType[]>([]);
  const handlesearch = (e) => {
    setData(mainData.filter(u => u.domain.includes(e.target.value)));
  };

  // get data
  const handleGetData = async () => {
    const res = await getDomainServices();
    setData(res.results || []);
    setMainData(res.results || []);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // delete modal
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteDomainServices(deleteId);
      successToast("Domain deleted successfully");
      setShowModal(false);
      setDeleteId(null);
      handleGetData();
    } catch (err) {
      errorToast("Failed to delete domain");
      setShowModal(false);
    }
  };

  // filters
  const [activityFilter, setActivityFilter] = useState<string>(null);
  const [statusFilter, setStatusFilter] = useState<string>(null);
  const [filteredData, setFilteredData] = useState<domainType[]>([]);

  useEffect(() => {
    setFilteredData(
      data.filter(d =>
        (!activityFilter || (activityFilter === "true") === d.isActive) &&
        (!statusFilter || d.status.toString() === statusFilter)
      )
    );
  }, [data, activityFilter, statusFilter]);

  return (
    <div className="p-3 sm:p-5">
      {/* filter and search*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

        {/* add domain */}
        <div className="w-auto pb-5 mt-5 border-b-2 md:border-b-0 md:w-auto">
          <AddDomain
            open={open}
            setOpen={setOpen}
            selecteItem={selecteItem}
            setSelectedItem={setSelectedItem}
            refreshList={handleGetData}
          />
        </div>

        {/* activity */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-end gap-3 w-full md:w-auto">
          <AppSelect
            className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px]"
            placeholder="Filter by activity"
            value={activityFilter || "all"}
            onChange={(val) => setActivityFilter(val === "all" ? null : val)}
            options={[
              { label: "All activity", value: "all" },
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
          />
          {/* status */}
          <AppSelect
            className="w-full sm:w-[200px] md:w-[250px] lg:w-[300px]"
            placeholder="Filter by status"
            value={statusFilter || "all"}
            onChange={(val) => setStatusFilter(val === "all" ? null : val)}
            options={[
              { label: "All status", value: "all" },
              { label: "Pending", value: "1" },
              { label: "Verified", value: "2" },
              { label: "Rejected", value: "3" },
            ]}
          />


          {/* search */}
          <div className="w-full border-b-2 md:border-b-0 sm:w-[200px] md:w-[250px] lg:w-[300px]">
            <SearchInput handlesearch={handlesearch} />
          </div>
        </div>
      </div>
      {
        data.length > 0 ?

          <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="min-w-[700px] w-full text-sm text-gray-700 dark:text-white bg-white dark:bg-stone-800">
              <thead className="dark:bg-stone-700 bg-emerald-700 text-white">
                <tr className="[&>th]:px-3 [&>th]:py-2 sm:[&>th]:px-4 sm:[&>th]:py-3 [&>th]:text-center text-xs sm:text-sm">
                  <th>#</th>
                  <th>Domain</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((value) => (
                    <tr
                      key={value.id}
                      className="[&>td]:px-3 [&>td]:py-2 sm:[&>td]:px-4 sm:[&>td]:py-3 border-b border-stone-200 hover:bg-gray-100 dark:hover:bg-stone-700 text-center transition-colors duration-200"
                    >
                      <td>{value.id}</td>
                      <td className="truncate max-w-[150px] sm:max-w-none">{value.domain}</td>

                      {/* Status */}
                      <td>
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full
                      ${value.status === 1
                              ? "bg-yellow-100 text-yellow-600"
                              : value.status === 2
                                ? "bg-sky-200 text-sky-600"
                                : value.status === 3
                                  ? "bg-pink-200 text-pink-600"
                                  : "bg-gray-200 text-gray-800"
                            }`}
                        >
                          {value.status === 1
                            ? "Pending"
                            : value.status === 2
                              ? "Verified"
                              : value.status === 3
                                ? "Rejected"
                                : "Unknown"}
                        </span>
                      </td>

                      {/* Active */}
                      <td>
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full
                      ${value.isActive
                              ? "bg-green-500/20 text-green-600"
                              : "bg-gray-200 text-gray-600"
                            }`}
                        >
                          {value.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="text-[10px] sm:text-xs">
                        {moment(value.createdDate).format("YYYY-MM-DD HH:mm A")}
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex justify-center gap-2">
                          <Tooltip content="Edit" color="green">
                            <button
                              onClick={() => {
                                setOpen(true);
                                setSelectedItem(value);
                              }}
                              className="text-emerald-700"
                            >
                              <LiaEditSolid size={16} />
                            </button>
                          </Tooltip>

                          <Tooltip content="Delete" color="red">
                            <button onClick={() => handleDeleteClick(value.id)} className="text-rose-700">
                              <BiTrash size={16} />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-300 text-sm">There is no data.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> :
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-red-600">
              <PiSealWarningLight size={40} color="" />
            </span>

            <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
              There is no domain yet
            </h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
              Try adding a new domain to see results here.
            </p>
            <span className="mt-3"><AddDomain
              open={open}
              setOpen={setOpen}
              selecteItem={selecteItem}
              setSelectedItem={setSelectedItem}
              refreshList={handleGetData}
              buttonLabel={"Add Domain Here"}
            /></span>
          </div>}

      {/* delete modal */}
      <ConfirmModal
        title="DELETE DOMAIN"
        message="Are you sure you want to delete this domain?"
        confirmText="Yes"
        cancelText="No"
        icon={() => <BiTrash size={20} />}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Table;
