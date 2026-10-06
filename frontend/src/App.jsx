import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [visitors, setVisitors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    personToMeet: "",
    department: ""
  });

  const fetchVisitors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/visitors");
      const data = await response.json();

      if (data.success) {
        setVisitors(data.visitors);
      }
    } catch (error) {
      console.error("Backend connection failed");
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addVisitor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/visitors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (data.success) {
        setForm({
          name: "",
          phone: "",
          email: "",
          purpose: "",
          personToMeet: "",
          department: ""
        });

        setShowForm(false);
        fetchVisitors();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend is not running.");
    }
  };

  const checkOut = async (id) => {
    await fetch(
      `http://localhost:5000/api/visitors/${id}/checkout`,
      {
        method: "PUT"
      }
    );

    fetchVisitors();
  };

  const checkedIn = visitors.filter(
    (visitor) => visitor.status === "Checked In"
  ).length;

  const checkedOut = visitors.filter(
    (visitor) => visitor.status === "Checked Out"
  ).length;

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>VisitorHub</h1>
          <p>Employee Visitor Management</p>
        </div>

        <button onClick={() => setShowForm(true)}>
          + Add Visitor
        </button>
      </header>

      <main>

        <div className="stats">

          <div className="card">
            <span>Total Visitors</span>
            <strong>{visitors.length}</strong>
          </div>

          <div className="card">
            <span>Currently Inside</span>
            <strong>{checkedIn}</strong>
          </div>

          <div className="card">
            <span>Checked Out</span>
            <strong>{checkedOut}</strong>
          </div>

        </div>

        <section className="visitorBox">

          <div className="sectionTitle">
            <div>
              <h2>Visitors</h2>
              <p>Recent visitor activity</p>
            </div>
          </div>

          <div className="tableWrapper">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Purpose</th>
                  <th>Person to Meet</th>
                  <th>Department</th>
                  <th>Check In</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {visitors.length === 0 ? (

                  <tr>
                    <td colSpan="8" className="empty">
                      No visitors yet. Click "Add Visitor" to add one.
                    </td>
                  </tr>

                ) : (

                  visitors.map((visitor) => (

                    <tr key={visitor._id}>

                      <td>
                        <strong>{visitor.name}</strong>
                        <small>{visitor.email}</small>
                      </td>

                      <td>{visitor.phone}</td>

                      <td>{visitor.purpose}</td>

                      <td>{visitor.personToMeet}</td>

                      <td>{visitor.department}</td>

                      <td>
                        {new Date(
                          visitor.checkIn
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>

                      <td>
                        <span
                          className={
                            visitor.status === "Checked In"
                              ? "status in"
                              : "status out"
                          }
                        >
                          {visitor.status}
                        </span>
                      </td>

                      <td>
                        {visitor.status === "Checked In" && (
                          <button
                            className="checkout"
                            onClick={() =>
                              checkOut(visitor._id)
                            }
                          >
                            Check Out
                          </button>
                        )}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {showForm && (

        <div className="overlay">

          <div className="modal">

            <div className="modalTop">
              <div>
                <h2>Add Visitor</h2>
                <p>Enter visitor details</p>
              </div>

              <button
                className="close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={addVisitor}>

              <input
                name="name"
                placeholder="Visitor Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="purpose"
                placeholder="Purpose of Visit"
                value={form.purpose}
                onChange={handleChange}
                required
              />

              <input
                name="personToMeet"
                placeholder="Person to Meet"
                value={form.personToMeet}
                onChange={handleChange}
                required
              />

              <input
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                required
              />

              <div className="formButtons">

                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit">
                  Add Visitor
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;