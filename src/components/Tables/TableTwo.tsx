import { Product } from "@/types/product";
const chatData = [
  {
    phoneNumber: "+6281234567890",
    time: "10:15 AM",
    message: "Hello, I need help with my order.",
    remarks: "First Chat",
  },
  {
    phoneNumber: "+6289876543210",
    time: "11:30 AM",
    message: "Can I return this item?",
    remarks: "First Chat",
  },
  {
    phoneNumber: "+6285551234567",
    time: "1:45 PM",
    message: "What's the status of my delivery?",
    remarks: "First Chat",
  },
  {
    phoneNumber: "+6282345678901",
    time: "2:20 PM",
    message: "I received the wrong product.",
    remarks: "First Chat",
  },
];

const TableTwo = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Daftar Chat
        </h4>
      </div>

      <div className="grid grid-cols-6 gap-x-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Nomor Pengirim</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Jam Chat Masuk</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Isi Pesan</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Remarks</p>
        </div>
      </div>

      {chatData.map((chat, key) => (
        <div
          className="grid grid-cols-6 gap-x-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {chat.phoneNumber}
            </p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {chat.time}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {chat.message}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {chat.remarks}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
