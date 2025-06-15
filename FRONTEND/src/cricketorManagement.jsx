import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CricketerManagement = () => {
    const apiBase = "http://localhost:7000/api/cricketers";  const [cricketers, setCricketers] = useState([]);
  const [formData, setFormData] = useState({
    cricketerId: "",
    cricketerName: "",
    team: "",
    battingStyle: ""
  });
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCricketers();
  }, []);

  const fetchCricketers = async () => {
    const res = await fetch(`${apiBase}/get-cricketers`);
    const data = await res.json();
    setCricketers(data);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.cricketerName) newErrors.cricketerName = "Name required";
    if (!formData.team) newErrors.team = "Team required";
    if (!formData.battingStyle) newErrors.battingStyle = "Batting style required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return toast.error("Please fix errors");

    const url = formData.cricketerId
      ? `${apiBase}/update-cricketer/${formData.cricketerId}`
      : `${apiBase}/add-cricketer`;
    const method = formData.cricketerId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cricketerName: formData.cricketerName,
        team: formData.team,
        battingStyle: formData.battingStyle
      })
    });

    const result = await res.json();
    toast.success(result.message || "Success");
    setFormData({ cricketerId: "", cricketerName: "", team: "", battingStyle: "" });
    fetchCricketers();
  };

  const handleEdit = (cricketer) => {
    setFormData({
      cricketerId: cricketer._id,
      cricketerName: cricketer.cricketerName,
      team: cricketer.team,
      battingStyle: cricketer.battingStyle
    });
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await fetch(`${apiBase}/delete-cricketer/${deleteId}`, { method: "DELETE" });
    toast.success("Cricketer deleted");
    fetchCricketers();
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-3">Add / Update Cricketer</h2>
      <Form>
        <Form.Control
          id="cricketerName"
          value={formData.cricketerName}
          onChange={handleChange}
          placeholder="Cricketer Name"
          isInvalid={!!errors.cricketerName}
          className="mb-2"
        />
        <Form.Control.Feedback type="invalid">
          {errors.cricketerName}
        </Form.Control.Feedback>

        <Form.Control
          id="team"
          value={formData.team}
          onChange={handleChange}
          placeholder="Team"
          isInvalid={!!errors.team}
          className="mb-2"
        />
        <Form.Control.Feedback type="invalid">
          {errors.team}
        </Form.Control.Feedback>

        <Form.Control
          id="battingStyle"
          value={formData.battingStyle}
          onChange={handleChange}
          placeholder="Batting Style"
          isInvalid={!!errors.battingStyle}
          className="mb-3"
        />
        <Form.Control.Feedback type="invalid">
          {errors.battingStyle}
        </Form.Control.Feedback>

        <Button onClick={handleSubmit}>
          {formData.cricketerId ? "Update" : "Add"} Cricketer
        </Button>
      </Form>

      <h3 className="mt-5">All Cricketers</h3>
      <ul className="list-group">
        {cricketers.map((c) => (
          <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{c.cricketerName}</strong> - {c.team} ({c.battingStyle})
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(c)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => confirmDelete(c._id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Cricketer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this cricketer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CricketerManagement;
