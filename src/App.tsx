import { useState } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { cancelLeasing, getActiveLeasings, getBalance } from "./lunes";

function App() {
  const [balance, setBalance] = useState(0);
  const [seed, setSeed] = useState("");
  const [leasings, setLeasings] = useState([]);

  async function handleLeasings() {
    setBalance((await getBalance(seed.trim())) / 10 ** 8);
    setLeasings(await getActiveLeasings(seed.trim()));
  }

  const notify = () =>
    toast.success("Cancelado com sucesso", {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  async function handleCancel(tx: string) {
    const cancel = await cancelLeasing(seed, tx);
    if (!cancel.id) {
      return;
    }

    notify();
    handleLeasings();
  }

  return (
    <div>
      <header className="header">
        <div className="column">
          <h1 className="logo">
            Lu<span>n</span>es
          </h1>
          <span className="subtitle">
            Need help to <span>cancel</span> a leasing?
          </span>
        </div>
      </header>

      <section className="main">
        <div className="container">
          <div className="column motivation">
            <h2 className="section-subtitle">What is happening?</h2>
            <p>
              Some Lunes users are having problems to cancel lease in{" "}
              <a className="link" href="https://luneswallet.app">
                Lunes Wallet
              </a>
              .
            </p>
            <p>
              To solve it, we are providing this page to help you cancel your
              locked lease.
            </p>
          </div>

          <div className="column">
            <h3 className="steps">Step 1: Insert your seed phrase bellow:</h3>
            <div className="row">
              <input
                className="input"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                onKeyPress={(key) => {
                  if (key.key === "Enter") {
                    handleLeasings();
                  }
                }}
              />
              <button className="ok-seed" onClick={() => handleLeasings()}>
                OK
              </button>
            </div>
          </div>

          <div className="column">
            <h3 className="steps">Lunes Balance: </h3>
            <span>{balance}</span>
          </div>

          <div className="column">
            <h3 className="steps">
              Step 2: Choose the lease you want to cancel:
            </h3>
            <table className="table">
              <thead>
                <tr className="table-header">
                  <td>ID</td>
                  <td>Amount</td>
                  <td>Node Address</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {leasings.map((lease, index) => {
                  return (
                    <tr key={index} className="table-body">
                      <td>{lease.id}</td>
                      <td>{lease.amount / 10 ** 8}</td>
                      <td>{lease.recipient}</td>
                      <td>
                        <button
                          className="button-cancel"
                          onClick={() => handleCancel(lease.id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="row">
          <div className="column">
            <h3 className="footer-subtitle">Lunes</h3>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://lunes.io"
              className="linkfooter"
            >
              Lunes Site
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="mailto:support@lunes.io"
              className="linkfooter"
            >
              Need help?
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/lunes-platform/cancel-leasing"
              className="linkfooter"
            >
              Get the source code
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://chrome.google.com/webstore/detail/lunes-lite/lpobojhglniknpdkecomjkkjdlkdabhk"
              className="linkfooter"
            >
              ❤️ Lunes Wallet Lite is available
            </a>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}

export default App;
