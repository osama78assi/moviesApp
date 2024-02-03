// Error Component
function ErrorMsg({ msg, onReload, onReset }) {
  return (
    <>
      <p className="error" style={{ color: "#f23" }}>
        {msg}
      </p>
      <button
        className="reload"
        onClick={() => {
          onReload();
          onReset("");
        }}
      >
        Reload
      </button>
    </>
  );
}

export default ErrorMsg;
