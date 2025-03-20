<script>
import Swal from "sweetalert2";
import api from "@/api";

export default {
    data() {
        return {
            departments: [],  // เปลี่ยนเป็น departments
            apiUrl: "/department.php",  // เปลี่ยนเป็น API ของแผนก
        };
    },
    methods: {
        async fetchDepartments() {  // เปลี่ยนชื่อจาก fetchCustomers เป็น fetchDepartments
            try {
                const response = await api.get(this.apiUrl);
                this.departments = response.data.data;
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        },

        async addDepartment() {  // เปลี่ยนจาก addCustomer เป็น addDepartment
            const { value: formData } = await Swal.fire({
                title: "เพิ่มแผนกใหม่",  // เปลี่ยนข้อความจาก "เพิ่มลูกค้าใหม่"
                html: `
                    <input id="swal-department-id" class="swal2-input" placeholder="รหัสแผนก">
                    <input id="swal-department-name" class="swal2-input" placeholder="ชื่อแผนก">
                `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => ({
                    DepartmentID: document.getElementById("swal-department-id").value,
                    DepartmentName: document.getElementById("swal-department-name").value,
                }),
            });

            if (formData) {
                try {
                    await api.post(this.apiUrl, formData);
                    Swal.fire("สำเร็จ", "เพิ่มแผนกเรียบร้อย", "success");
                    this.fetchDepartments();
                } catch (error) {
                    Swal.fire("ผิดพลาด", "ไม่สามารถเพิ่มแผนกได้", "error");
                }
            }
        },

        async editDepartment(department) {  // เปลี่ยนจาก editCustomer เป็น editDepartment
            const { value: formData } = await Swal.fire({
                title: "แก้ไขข้อมูลแผนก",  // เปลี่ยนข้อความจาก "แก้ไขข้อมูลลูกค้า"
                html: `
                    <input id="swal-department-name" class="swal2-input" placeholder="ชื่อแผนก" value="${department.DepartmentName}">
                `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => ({
                    DepartmentID: department.DepartmentID,
                    DepartmentName: document.getElementById("swal-department-name").value,
                }),
            });

            if (formData) {
                try {
                    const response = await api.put(this.apiUrl, formData);
                    Swal.fire("สำเร็จ", response.data.message, "success");
                    this.fetchDepartments();
                } catch (error) {
                    Swal.fire("ผิดพลาด", error.response?.data?.message || "ไม่สามารถอัปเดตข้อมูลได้", "error");
                }
            }
        },

        async deleteDepartment(id) {  // เปลี่ยนจาก deleteCustomer เป็น deleteDepartment
            const result = await Swal.fire({
                title: "ยืนยันการลบแผนก?",  // เปลี่ยนข้อความจาก "ยืนยันการลบ?"
                text: "คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลแผนกนี้",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "ใช่, ลบเลย!",
                cancelButtonText: "ยกเลิก",
            });

            if (result.isConfirmed) {
                try {
                    await api.delete(this.apiUrl, { data: { DepartmentID: id } });
                    Swal.fire("ลบสำเร็จ", "ข้อมูลแผนกถูกลบแล้ว", "success");
                    this.fetchDepartments();
                } catch (error) {
                    Swal.fire("ผิดพลาด", "ไม่สามารถลบแผนกได้", "error");
                }
            }
        },
    },
    mounted() {
        this.fetchDepartments();  // เปลี่ยนจาก fetchCustomers เป็น fetchDepartments
    },
};
</script>

<template>
    <div class="min-vh-100">
        <div class="container mt-5 pt-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="text-primary">📋 รายชื่อแผนก</h2>  <!-- เปลี่ยนจาก "รายชื่อลูกค้า" เป็น "รายชื่อแผนก" -->
                <button class="btn btn-success shadow-sm" @click="addDepartment"> <!-- เปลี่ยนจาก addCustomer เป็น addDepartment -->
                    <i class="fas fa-plus"></i> เพิ่มแผนก
                </button>
            </div>

            <div class="table-responsive rounded shadow">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>ชื่อแผนก</th>  <!-- เปลี่ยนจาก "ชื่อ" เป็น "ชื่อแผนก" -->
                            <th class="text-center">การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(department, index) in departments" :key="department.DepartmentID" class="table-row">
                            <td>{{ index + 1 }}</td>
                            <td>{{ department.DepartmentName }}</td>  <!-- แสดงข้อมูลชื่อแผนก -->
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm me-2 shadow-sm" @click="editDepartment(department)">
                                    <i class="fas fa-edit"></i> แก้ไข
                                </button>
                                <button class="btn btn-danger btn-sm shadow-sm" @click="deleteDepartment(department.DepartmentID)">
                                    <i class="fas fa-trash"></i> ลบ
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
