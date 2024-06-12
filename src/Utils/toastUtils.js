// toastUtils.js
import { toast } from 'react-hot-toast';

export const showToast = (message, onAccept, onReject) => {
  toast.custom(
    (t) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: '1em',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>{message}</p>
        <div style={{ display: 'flex', gap: '1em' }}>
          <button
            onClick={() => {
              onAccept();
              toast.dismiss(t.id); // Dismiss the toast
            }}
            style={{
              padding: '0.5em 1em',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Accept
          </button>
          <button
            onClick={() => {
              onReject();
              toast.dismiss(t.id); // Dismiss the toast
            }}
            style={{
              padding: '0.5em 1em',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Reject
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity, // Keep the toast open until button is clicked
    }
  );
};
