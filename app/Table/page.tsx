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

function Table() {
  // open edit modal
  const [open, setOpen] = useState(false);
  const [selecteItem, setSelectedItem] = useState<domainType>(null);

  // state for domain data
  const [data, setData] = useState<domainType[]>([]);
  const [mainData, setMainData] = useState<domainType[]>([]);

  // search box
  const handlesearch = (e) => {
    setData(mainData.filter(u => u.domain.includes(e.target.value)));
  };

  // get domain
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

  // delete domain
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
    <div className="p-5 items-center">
      <div className="flex justify-between gap-5">
        <AddDomain
          open={open}
          setOpen={setOpen}
          selecteItem={selecteItem}
          setSelectedItem={setSelectedItem}
          refreshList={handleGetData}
        />
      </div>

      <div className="flex justify-end gap-5 -mt-10 items-center">
        {/* Filter by activity */}
        <AppSelect
          className="w-[300px]"
          placeholder="Filter by activity"
          value={activityFilter || "all"}
          onChange={(val) => setActivityFilter(val === "all" ? null : val)}
          options={[
            { label: "Filter by activity", value: "all" },
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
        />

        {/* Filter by status */}
        <AppSelect
          className="w-[300px]"
          placeholder="Filter by status"
          value={statusFilter || "all"}
          onChange={(val) => setStatusFilter(val === "all" ? null : val)}
          options={[
            { label: "Filter by status", value: "all" },
            { label: "Pending", value: "1" },
            { label: "Verified", value: "2" },
            { label: "Rejected", value: "3" },
          ]}
        />

        {/* Search input */}
        <SearchInput handlesearch={handlesearch} />
      </div>

      <table className="w-full table-fixed text-sm dark:text-white shadow-md bg-white dark:bg-stone-800 rounded-xl overflow-hidden">
        <thead className="dark:bg-stone-700 bg-emerald-700 text-white">
          <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:text-center">
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
                className="[&>td]:px-4 [&>td]:py-3 border-b border-stone-200 hover:bg-gray-100 text-center transition-colors duration-200"
              >
                <td>{value.domain}</td>

                {/* Status */}
                <td>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300
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
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300
                    ${value.isActive
                        ? "bg-green-500/20 text-green-600"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {value.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Created date */}
                <td>{moment(value.createdDate).format('YYYY-MM-DD hh:mm:ss A')}</td>

                {/* Actions */}
                <td>
                  <Tooltip content="Edit" color="green">
                    <button
                      onClick={() => {
                        setOpen(true);
                        setSelectedItem(value);
                      }}
                      className="text-emerald-700 mx-1"
                    >
                      <LiaEditSolid size={17} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete" color="red">
                    <button onClick={() => handleDeleteClick(value.id)} className="text-rose-700">
                      <BiTrash size={17} />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <span className="text-center my-5 items-center flex justify-center">
                  <p>There is no data.</p>
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirm delete modal */}
      <ConfirmModal
        title='DELETE DOMAIN'
        message={`Are you sure you want to delete this domain?`}
        confirmText='Yes'
        cancelText='No'
        icon={() => (<BiTrash size={20} />)}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Table;
