

import { useSelector, useDispatch } from 'react-redux';
import { selectEmail } from '../store/emailSlice'; // Import your Redux actions

const EmailDetails = () => {
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const dispatch = useDispatch();

  const handleMarkAsFavorite = () => {
    if (selectedEmail) {
     
      selectedEmail.isFavorite = !selectedEmail.isFavorite;
      
      dispatch(selectEmail(selectedEmail));
    }
  };

  return (
    <div className="email-details">
      {selectedEmail && (
        <div>
          <div className="email-subject">{selectedEmail.subject}</div>
          <div className="email-body">{selectedEmail.body}</div>
          <div className="email-date-time">{selectedEmail.dateTime}</div>
          <button onClick={handleMarkAsFavorite}>
            {selectedEmail.isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailDetails;
