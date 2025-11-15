import React, { useState, useEffect } from "react";

// Service modules (modularized API)
import { getStudents } from "../../../services/students";
import { getCourses } from "../../../services/courses";
import {
  getPayments,
  addPayment,
  deletePayment,
} from "../../../services/payments";
import { getBalanceByStudent } from "../../../services/balances";
import { generateQR } from "../../../services/qrcode";

export default function AdminPayments() {
  // Data
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [balance, setBalance] = useState(null);

  // UI State
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  const [qrPayment, setQrPayment] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    amount: "",
    payment_date: "",
    payment_method: "",
    reference_number: "",
  });

  // Load dropdown + payments on mount
  useEffect(() => {
    fetchDropdownData();
    fetchPaymentsData();
  }, []);

  // ----------- Fetch dropdown data -----------
  const fetchDropdownData = async () => {
    try {
      const [studentsData, coursesData] = await Promise.all([
        getStudents(),
        getCourses(),
      ]);
      setStudents(studentsData);
      setCourses(coursesData);
    } catch (err) {
      console.error("Dropdown fetch failed:", err);
    }
  };

  // ----------- Fetch payments -----------
  const fetchPaymentsData = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err) {
      console.error("Payment fetch failed:", err);
    }
  };

  // ----------- Fetch balance for student -----------
  const fetchBalanceData = async (studentId) => {
    if (!studentId) {
      setBalance(null);
      return;
    }

    try {
      const data = await getBalanceByStudent(studentId);
      setBalance(data);
    } catch (err) {
      console.error("Balance fetch failed:", err);
      setBalance(null);
    }
  };

  // ----------- Handle form inputs -----------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "student_id") {
      fetchBalanceData(value);
    }
  };

  // ----------- Submit new payment -----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addPayment(formData);
      fetchPaymentsData();
      fetchBalanceData(formData.student_id);

      // Reset form
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
      console.error("Add payment failed:", err);
      alert("Failed to add payment.");
    } finally {
      setLoading(false);
    }
  };

  // ----------- Delete payment -----------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await deletePayment(id);
      fetchPaymentsData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ----------- Generate and show QR code -----------
  const handleViewQR = async (payment) => {
    try {
      setQrModalOpen(true);
      setQrLoading(true);
      setQrPayment(payment);
      setQrImage(null);

      const qrText = `
Receipt: ${payment.reference_number}
Student ID: ${payment.student_id}
Amount: ₱${payment.amount}
Date: ${payment.payment_date}
Method: ${payment.payment_method}
      `;

      const qrUrl = await generateQR(qrText.trim());
      setQrImage(qrUrl);
    } catch (err) {
      console.error("QR generation failed:", err);
    } finally {
      setQrLoading(false);
    }
  };

  // ======================================================
  // ======================= UI ===========================
  // ======================================================

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Payment Management
      </h1>

      {/* ======================== FORM ======================== */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add New Payment
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Student Dropdown */}
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="border p-3 rounded-lg"
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
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_code} - {c.title}
              </option>
            ))}
          </select>

          {/* Balance Summary */}
          {balance && (
            <div className="col-span-2 bg-blue-50 p-4 border border-blue-100 rounded-lg text-sm">
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
                      : "text-green-600 font-semibold"
                  }
                >
                  ₱{balance.outstanding_balance}
                </span>
              </p>
            </div>
          )}

          {/* Form Fields */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="payment_method"
            placeholder="Payment Method"
            value={formData.payment_method}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            name="reference_number"
            placeholder="Reference Number"
            value={formData.reference_number}
            onChange={handleChange}
            className="border p-3 rounded-lg col-span-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Add Payment"}
          </button>
        </form>
      </div>

      {/* ======================== PAYMENTS TABLE ======================== */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Payment Records
        </h2>

        {payments.length === 0 ? (
          <p className="text-gray-500">No payment records found.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Student</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Method</th>
                <th className="p-3 border">Ref #</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, idx) => (
                <tr key={p.payment_id} className="hover:bg-gray-50">
                  <td className="p-3 border">{idx + 1}</td>
                  <td className="p-3 border">{p.student_id}</td>
                  <td className="p-3 border">{p.course_id}</td>
                  <td className="p-3 border font-semibold text-green-700">
                    ₱{p.amount}
                  </td>
                  <td className="p-3 border">{p.payment_date}</td>
                  <td className="p-3 border">{p.payment_method}</td>
                  <td className="p-3 border">{p.reference_number}</td>
                  <td className="p-3 border text-center space-x-3">
                    <button
                      onClick={() => handleViewQR(p)}
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      View QR
                    </button>
                    <button
                      onClick={() => handleDelete(p.payment_id)}
                      className="text-red-600 font-medium hover:text-red-800"
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

      {/* ======================== QR MODAL ======================== */}
      {qrModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm text-center relative">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>

            <h3 className="text-lg font-bold mb-4 text-gray-700">QR Receipt</h3>

            {qrLoading ? (
              <p className="text-gray-600">Generating QR...</p>
            ) : qrImage ? (
              <>
                <img
                  src={qrImage}
                  alt="QR"
                  className="mx-auto mb-3 border rounded-lg p-2"
                />
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  Ref: {qrPayment.reference_number}
                  {"\n"}
                  Amount: ₱{qrPayment.amount}
                </p>
              </>
            ) : (
              <p className="text-red-500 text-sm">Failed to load QR code.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
