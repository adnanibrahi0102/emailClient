import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailList,
  selectEmail,
  markAsRead,
  markAsUnread,
  markAsFavorite,
  markAsNotFavorite,
} from "../store/emailSlice";
import axios from "axios";

const EmailList = () => {
  const emailList = useSelector((state) => state.emails.emailList) || [];
  const dispatch = useDispatch();

  const fetchEmailList = async () => {
    try {
      const response = await axios.get("https://flipkart-email-mock.now.sh/");
      const emailListData = response.data.list;

      if (Array.isArray(emailListData)) {
        dispatch(setEmailList(emailListData));
      } else {
        console.error("Fetched data is not an array:", emailListData);
      }
    } catch (error) {
      console.error("Error fetching email list:", error);
    }
  };

  useEffect(() => {
    if (emailList.length === 0) {
      fetchEmailList();
    }
  }, [dispatch, emailList]);

  const [filter, setFilter] = useState("All");

  const filteredEmails = emailList.filter((email) => {
    if (filter === "All") return true;
    if (filter === "Favorites") return email.isFavorite;
    if (filter === "Read") return email.isRead;
    if (filter === "Unread") return !email.isRead;
    return true;
  });

  const handleEmailClick = (email) => {
    dispatch(selectEmail(email));
  };

  const handleMarkAsRead = (email) => {
    dispatch(markAsRead(email.id));
  };

  const handleMarkAsUnread = (email) => {
    dispatch(markAsUnread(email.id));
  };

  const handleMarkAsFavorite = (email) => {
    dispatch(markAsFavorite(email.id));
  };

  const handleMarkAsNotFavorite = (email) => {
    dispatch(markAsNotFavorite(email.id));
  };

  return (
    <div className="email-list">
      <div className="filter-buttons flex space-x-2">
        <button
          className={`${
            filter === "All" ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          } p-2 rounded-md border`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`${
            filter === "Favorites"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } p-2 rounded-md border`}
          onClick={() => setFilter("Favorites")}
        >
          Favorites
        </button>
        <button
          className={`${
            filter === "Read" ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          } p-2 rounded-md border`}
          onClick={() => setFilter("Read")}
        >
          Read
        </button>
        <button
          className={`${
            filter === "Unread"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } p-2 rounded-md border`}
          onClick={() => setFilter("Unread")}
        >
          Unread
        </button>
      </div>
      {filteredEmails.map((email) => (
        <div
          key={email.id}
          className={`email-item ${
            email.isRead ? "bg-white" : "bg-blue-100"
          } p-4 mb-2 cursor-pointer flex items-center`}
          onClick={() => handleEmailClick(email)}
        >
          <div className="avatar bg-blue-500 text-white p-4 rounded-full text-xl">
            {email.from.name[0]}
          </div>
          <div className="email-content ml-4 flex-1">
            <div className="sender text-lg font-semibold">
              {email.from.name} &lt;{email.from.email}&gt;
            </div>
            <div className="subject text-blue-500 font-medium">
              {email.subject}
            </div>
            <div className="date-time text-gray-500">
              {new Date(email.date).toDateString()}
            </div>
          </div>
          <button
            className={`${
              email.isRead ? "bg-blue-500 text-white" : "bg-white text-blue-500"
            } p-2 rounded-md border mr-2`}
            onClick={() => (email.isRead ? handleMarkAsUnread(email) : handleMarkAsRead(email))}
          >
            {email.isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
          <button
            className={`${
              email.isFavorite ? "bg-yellow-500 text-white" : "bg-white text-yellow-500"
            } p-2 rounded-md border`}
            onClick={() => (email.isFavorite ? handleMarkAsNotFavorite(email) : handleMarkAsFavorite(email))}
          >
            {email.isFavorite ? "Remove from Favorites" : "Mark as Favorite"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmailList;
