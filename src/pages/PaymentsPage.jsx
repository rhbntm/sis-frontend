import React, { useState, useEffect } from "react";
import axios from "axios";
import { getStudents, getCourses } from "../services/api";

const API_BASE = "http://localhost/student_information_system/public/api";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    amount: "",
    payment_date: "",
    payment_method: "",
    reference_number: "",
  });

  // ✅ Fetch students and courses
  const fetchDropdownData = async () => {
    try {
      const [studentsData, coursesData] = await Promise.all([
        getStudents(),
        getCourses(),
      ]);
      setStudents(studentsData);
      setCourses(coursesData);
    } catch (err) {
      console.error("Dropdown data fetch failed:", err);
    }
  };

  // ✅ Fetch all payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/payments`);
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  // ✅ Fetch a student’s balance automatically
  const fetchBalance = async (studentId) => {
    if (!studentId) {
      setBalance(null);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/balances/student/${studentId}`);
      setBalance(res.data);
    } catch (err) {
      console.warn("No balance record found for this student.");
      setBalance(null);
    }
  };

  useEffect(() => {
    fetchDropdownData();
    fetchPayments();
  }, []);

  // ✅ Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Auto-load balance when student changes
    if (name === "student_id") {
      fetchBalance(value);
    }
  };

  // ✅ Add payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/payments`, formData);
      fetchPayments();
      fetchBalance(formData.student_id); // refresh updated balance
      setFormData({
        student_id: "",
        course_id: "",
        amount: "",
        payment_date: "",
        payment_method: "",
        reference_number: "",
      });
      setBalance(null);
    } catch (err) {
      alert("Failed to add payment. Check console for details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete payment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    try {
      await axios.delete(`${API_BASE}/payments/${id}`);
      fetchPayments();
    } catch (err) {
      console.error("Failed to delete payment:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        💰 Payment Management
      </h1>

      {/* Payment Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Payment</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Student Dropdown */}
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.first_name} {s.last_name}
              </option>
            ))}
          </select>

          {/* Course Dropdown */}
          <select
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_code} - {c.title}
              </option>
            ))}
          </select>

          {/* Display linked student balance */}
          {balance && (
            <div className="col-span-2 bg-blue-50 border border-blue-100 p-3 rounded text-sm">
              <p>
                <strong>Total Due:</strong> ₱{balance.total_due}
              </p>
              <p>
                <strong>Total Paid:</strong> ₱{balance.total_paid}
              </p>
              <p>
                <strong>Outstanding:</strong>{" "}
                <span
                  className={
                    balance.outstanding_balance > 0
                      ? "text-red-600 font-semibold"
                      : "text-green-700 font-semibold"
                  }
                >
                  ₱{balance.outstanding_balance}
                </span>
              </p>
            </div>
          )}

          {/* Payment details */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="payment_method"
            placeholder="Payment Method"
            value={formData.payment_method}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="reference_number"
            placeholder="Reference Number"
            value={formData.reference_number}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded col-span-2 hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Add Payment"}
          </button>
        </form>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-3">Payment Records</h2>
        {payments.length === 0 ? (
          <p>No payment records found.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50 text-left border-b">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Method</th>
                <th className="p-2 border">Reference</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr key={p.payment_id} className="hover:bg-gray-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{p.student_id}</td>
                  <td className="p-2 border">{p.course_id}</td>
                  <td className="p-2 border font-semibold text-green-700">
                    ₱{p.amount}
                  </td>
                  <td className="p-2 border">{p.payment_date}</td>
                  <td className="p-2 border">{p.payment_method}</td>
                  <td className="p-2 border">{p.reference_number}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleDelete(p.payment_id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
